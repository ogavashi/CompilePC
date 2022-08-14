import * as functions from 'firebase-functions';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { CPU } from '../../../types';

import {
  DEFAULT_REGION,
  EKATALOG_LIST_LINK,
  EKATALOG_LINK,
} from '../common/constants';
import parseCPUPage from '../cpu/parseCPUPage';

puppeteer.use(StealthPlugin());

const parseComponentsData = functions
  .region(DEFAULT_REGION)
  .https.onRequest(async () => {
    try {
      const options: any = {
        headless: true,
        args: ['--lang=en-US'],
        ignoreHTTPSErrors: true,
      };
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();
      await page.goto(`${EKATALOG_LIST_LINK}186`, {
        waitUntil: ['networkidle2', 'domcontentloaded'],
      });

      await page.waitForSelector("[data-lang='en']");
      await page.click("[data-lang='en']");
      await page.waitForTimeout(5000);

      // const productLinks = await page.evaluate(async () =>
      //   Array.from(document.querySelectorAll('.model-short-title'), (a) =>
      //     a.getAttribute('href'),
      //   ),
      // );

      const productLinks = ['/en/AMD-5600X-BOX.htm'];

      const products: CPU[] = [];

      for await (const link of productLinks) {
        if (!link) return;

        const productPage = await browser.newPage();
        await productPage.goto(`${EKATALOG_LINK}${link}`, {
          waitUntil: ['networkidle2', 'domcontentloaded'],
        });

        const product = await parseCPUPage(productPage);
        if (!product) return;

        products.push(product);
      }

      const [prod] = products;

      console.log(prod);

      await browser.close();
    } catch (err) {
      console.log(err);
    }
    return;
  });

export default parseComponentsData;
