import { Page } from 'puppeteer';

const parseElementInnerHTML = async (
  selector: string,
  page: Page,
): Promise<string | null> => {
  const element = await page.$(selector);

  if (!element) return null;

  const text = await page.evaluate((el) => el.innerHTML, element);
  return text;
};

export default parseElementInnerHTML;
