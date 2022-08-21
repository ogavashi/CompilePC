import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { CPU } from '../../../types';

import {
  DEFAULT_REGION,
  EKATALOG_LIST_LINK,
  EKATALOG_LINK,
  parserByCategoryId,
} from '../common/constants';
import mapFirestoreDocSnap from '../common/mapFirestoreDocSnap';
import { Category } from '../../../types';

puppeteer.use(StealthPlugin());
const firestore = admin.firestore();

const runtimeOpts = {
  timeoutSeconds: 540,
};

const parseComponentsData = functions
  .region(DEFAULT_REGION)
  .runWith(runtimeOpts)
  .https.onRequest(async () => {
    try {
      const options: any = {
        headless: true,
        args: ['--lang=en-US'],
        ignoreHTTPSErrors: true,
      };

      const categoriesRef = firestore.collection('categories');

      const categoriesSnap = await categoriesRef.get();
      const categories = categoriesSnap.docs.map((doc) =>
        mapFirestoreDocSnap<Category>(doc),
      );

      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();

      for await (const category of categories) {
        if (!category) return;

        await page.goto(`${EKATALOG_LIST_LINK}${category.id}`, {
          waitUntil: ['networkidle2', 'domcontentloaded'],
        });

        await page.waitForSelector("[data-lang='en']");
        await page.click("[data-lang='en']");
        await page.waitForTimeout(5000);

        const productLinks = await page.evaluate(async () =>
          Array.from(document.querySelectorAll('.model-short-title'), (a) =>
            a.getAttribute('href'),
          ),
        );

        const products: CPU[] = [];

        for await (const link of productLinks) {
          if (!link) return;

          const productPage = await browser.newPage();
          await productPage.goto(`${EKATALOG_LINK}${link}`, {
            waitUntil: ['networkidle2', 'domcontentloaded'],
          });

          const productId = link.split('/en/').join('').split('.htm').join(); // TODO: use regex

          const parser = parserByCategoryId[category.id];
          if (!parser) return;

          const product = await parser(productId, productPage);
          if (!product) return;

          products.push(product);
        }

        const categoryCollectionRef = firestore.collection(category.name);
        const batch = firestore.batch();

        products.forEach((product) => {
          const updatedRef = categoryCollectionRef.doc(product.id);
          batch.set(updatedRef, product, { merge: true });
        });

        await batch.commit();
      }
      await browser.close();
    } catch (err) {
      console.log(err);
    }
    return;
  });

export default parseComponentsData;
