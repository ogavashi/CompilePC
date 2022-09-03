import { Page } from 'puppeteer';

const parseColorDivs = async (
  xpath: string,
  page: Page,
): Promise<string[] | null> => {
  if (!(await page.$('.small-col-plate2')) && !(await page.$('.descr-color')))
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
