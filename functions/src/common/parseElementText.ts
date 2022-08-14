import { Page } from 'puppeteer';

const parseElementText = async (
  selector: string,
  page: Page,
): Promise<string | null> => {
  const element = await page.$(selector);

  if (!element) return null;

  const text = await page.evaluate((el) => el.textContent, element);
  return text;
};

export default parseElementText;
