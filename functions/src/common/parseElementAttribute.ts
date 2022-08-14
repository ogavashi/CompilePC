import { Page } from 'puppeteer';

interface ParseElementAttributeParams {
  attribute: string;
  selector: string;
  page: Page;
}

const parseElementAttribute = async ({
  attribute,
  selector,
  page,
}: ParseElementAttributeParams): Promise<string | null> => {
  const element = await page.$(selector);

  if (!element) return null;

  const attributeValue = await page.evaluate(
    (el) => el.getAttribute(attribute),
    element,
  );
  return attributeValue;
};

export default parseElementAttribute;
