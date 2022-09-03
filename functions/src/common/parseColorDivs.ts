import { Page } from 'puppeteer';
import { CASE_COLOR_DIVS, RAM_COLOR_DIVS } from './constants';

const parseColorDivs = async (
  xpath: string,
  page: Page,
): Promise<string[] | null> => {
  if (!(await page.$(RAM_COLOR_DIVS)) && !(await page.$(CASE_COLOR_DIVS)))
    return null;
  const elements = await page.$x(xpath);

  if (!elements) return [];

  const attributeArray: string[] = [];

  const promises = elements.map(async (element) => {
    const attributeValue = await page.evaluate(
      (el) => el.getAttribute('title'),
      element,
    );
    attributeArray.push(attributeValue);
  });
  await Promise.all(promises);
  return attributeArray;
};

export default parseColorDivs;
