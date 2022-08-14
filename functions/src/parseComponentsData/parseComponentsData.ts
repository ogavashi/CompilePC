import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';

import {
  DEFAULT_REGION,
  EKATALOG_LIST_LINK,
  EKATALOG_PRODUCT_LINK,
} from '../common/constants';
import getElementText from './helpers/getElementText';

const parseComponentsData = functions
  .region(DEFAULT_REGION)
  .https.onCall(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${EKATALOG_LIST_LINK}186`);

    const links = await page.evaluate(async () =>
      Array.from(document.querySelectorAll('.model-short-title'), (a) =>
        a.getAttribute('href'),
      ),
    );

    // const data: any = [];
    // const result: any = {}; //to fix
    for await (const link of links) {
      link &&
        (await page.goto(`${EKATALOG_PRODUCT_LINK}${link}`, {
          waitUntil: 'domcontentloaded',
        }));
      const mainText = await getElementText('.op1-tt', page);
      const secondaryText = await getElementText('.op1-tt span', page);
    }

    await browser.close();
    return 'biba';
  });

export default parseComponentsData;
