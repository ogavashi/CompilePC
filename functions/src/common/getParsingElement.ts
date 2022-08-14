import { ElementHandle, Page } from 'puppeteer';

const getParsingElement = async (
  selector: string,
  page: Page,
): Promise<ElementHandle<Element> | null> => {
  const element = await page.$(selector);

  return element;
};

export default getParsingElement;
