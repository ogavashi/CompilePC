import { Motherboard } from './../../../types/index';
import puppeteer from 'puppeteer-extra';
import * as functions from 'firebase-functions';

import {
  CATEGORIES_COLLECTION_NAME,
  DEFAULT_REGION,
  EKATALOG_LINK,
  EKATALOG_LIST_LINK,
  regexes,
} from '../common/constants';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { getDB } from '../bootstrap';
import parseMotherboardPage from '../motherboard/parseMotherboardPage';
puppeteer.use(StealthPlugin());

const runtimeOpts = {
  timeoutSeconds: 540,
};

const testCategory = functions
  .region(DEFAULT_REGION)
  .runWith(runtimeOpts)
  .https.onRequest(async () => {
    try {
      const options: any = {
        headless: true,
        args: ['--lang=en-US'],
        ignoreHTTPSErrors: true,
      };

      const db = await getDB();

      const categoriesCursor = db.collection(CATEGORIES_COLLECTION_NAME).find();
      const categories = await categoriesCursor.toArray();

      const category = categories[1]; // choose your category by index; add it beforehand in firebase console, if it does not exist
      if (!category) return;

      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();
      await page.goto(`${EKATALOG_LIST_LINK}${category.ekatalog_id}`, {
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
      const products: Motherboard[] = []; // put your component type here
      for await (const link of productLinks) {
        if (!link) return;

        const productPage = await browser.newPage();
        await productPage.goto(`${EKATALOG_LINK}${link}`, {
          waitUntil: ['networkidle2', 'domcontentloaded'],
        });

        const productId = link.replace(regexes.cleanLinkForProductId, '');

        const parser = parseMotherboardPage; // put YOUR parser here
        if (!parser) return;

        const product = await parser(productId, productPage);
        if (!product) return;

        products.push(product);
      }
      const categoryCollectionRef = db.collection(category.name);
      const bulk = categoryCollectionRef.initializeUnorderedBulkOp();

      await categoryCollectionRef.deleteMany({});
      products.forEach((product) => {
        bulk.insert(product);
      });
      await bulk.execute();
      await browser.close();
      console.log('finish');
    } catch (err) {
      console.log(err);
    }
    return;
  });

export default testCategory;
