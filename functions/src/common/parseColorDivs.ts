import { Page } from 'puppeteer';

const parseColorDivs = async (
  xpath: string,
  page: Page,
): Promise<string[] | []> => {
  try {
    if (!(await page.$('.small-col-plate2'))) return [];
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
  } catch (err) {
    return [];
  }
};

export default parseColorDivs;
