import { Page } from 'puppeteer';

const getElementText = async (selector: string, page: Page): string => {
  const element = await page.$(selector);
  const text = await page.evaluate((el) => el.textContent, element);
  return text;
};

export default getElementText;
