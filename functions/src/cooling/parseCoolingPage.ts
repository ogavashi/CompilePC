import { Page } from 'puppeteer';
import { Cooling } from '../../../types';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { xPathSelectors } from '../common/constants';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import parseElementText from '../common/parseElementText';

const parseCoolingPage = async (
  productId: string,
  page: Page,
): Promise<Cooling | null> => {
  const description = await parseElementInnerHTML('.desc-ai-title', page);

  await page.waitForXPath(xPathSelectors.specificationButton);
  const anchor = (await page.$x(xPathSelectors.specificationButton)) as any;
  await Promise.all([
    await anchor[0].click(),
    await page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  const name = await parseElementText('.op1-tt', page);

  const mainImageContainer = await getParsingElement('.img200', page);
  const mainImage = await page.evaluate(
    (el) => el.lastElementChild.getAttribute('srcset').split(' ')[0],
    mainImageContainer,
  );

  const specsTable = await getParsingElement('#help_table', page);

  const rawSpecsTable = await page.evaluate(async (node) => {
    async function getNodeTreeText(
      inputNode: HTMLElement,
    ): Promise<string | null> {
      if (inputNode && inputNode.hasChildNodes()) {
        return node.innerText;
      }

      return null;
    }
    return getNodeTreeText(node);
  }, specsTable);

  if (!name || !mainImage || !rawSpecsTable) return null;

  const cleanedSpecsTable = cleanComplexTable(rawSpecsTable);

  const specs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');
    if (!name || !value) return;

    const camelName = camelize(name);

    specs[camelName] = removeNonBreakingSpace(value);
  });

  const sockets = specs.socket?.split(',');

  await page.waitForXPath(xPathSelectors.pricesButton);
  const pricePageAnchor = (await page.$x(xPathSelectors.pricesButton)) as any;
  await Promise.all([
    await pricePageAnchor[0].click(),
    await page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  // let biba = 0;

  // await page.waitForXPath(xPathSelectors.loadMoreButton);
  // const loadMoreButton = (await page.$x(xPathSelectors.loadMoreButton)) as any;

  // const buttonExists = async () =>
  //   await page.evaluate(() =>
  //     Boolean(document.querySelector('.list-more-div')),
  //   );

  // while (await buttonExists()) {
  //   biba++;
  //   await loadMoreButton[0].click();
  //   if (biba === 10) break;
  // }

  const prices = await page.evaluate(async () => {
    const prices: number[] = [];
    const priceDivs = document.querySelectorAll('.where-buy-price');
    priceDivs.forEach((div) => {
      if (div.children[0].textContent)
        prices.push(+div.children[0].textContent.replace(/\D/g, ''));
    });
    return prices;
  });

  const stores = await page.evaluate(async () => {
    const stores: string[] = [];
    const storeDivs = document.querySelectorAll('.it-shop');
    storeDivs.forEach((div) => div.textContent && stores.push(div.textContent));
    return stores;
  });

  const storeImageUrls = await page.evaluate(async () => {
    const urls: string[] = [];
    const imageDivs = document.querySelectorAll('.where-buy-logo');
    imageDivs.forEach((div) =>
      urls.push(
        'https://ek.ua' + div.children[0].children[0].getAttribute('src'),
      ),
    );
    return urls;
  });

  const itemUrls = await page.evaluate(async () => {
    const urls: string[] = [];
    const itemDivs = document.querySelectorAll('.it-shop');
    itemDivs.forEach((div) => {
      const link = div.getAttribute('onmouseover');
      link && urls.push(link.split('"')[1]);
    });
    return urls;
  });

  console.log(prices);
  console.log(stores);
  console.log(storeImageUrls);
  console.log(itemUrls);

  return {
    id: productId,
    name,
    mainImage,
    description: description || undefined,
    officialWebsite: specs?.officialWebsite,
    target: specs?.features,
    type: specs?.productType,
    fans: +specs?.fans,
    heatPipes: +specs?.heatPipes,
    heatPipeContact: specs?.heatPipeContact,
    heatSinkMaterial: specs?.heatSinkMaterial,
    plateMaterial: specs?.plateMaterial,
    mountType: specs?.mountType,
    socket: sockets,
    fanSize: specs?.fanSize,
    bearing: specs?.bearing,
    minRPM: specs?.minRPM,
    maxRPM: specs?.maxRPM,
    speedController: specs?.speedController,
    maxAirFlow: specs?.maxAirFlow,
    maxTDP: specs?.maxTDP,
    airFlowDirection: specs?.airFlowDirection,
    replaceable: !specs?.replaceable,
    staticPreasure: specs?.staticPreasure,
    lighting: !specs?.lighting,
    lightingColour: specs?.lightingColour,
    powerSource: specs?.powerSource,
    minNoiseLevel: specs?.minNoiseLevel,
    noiseLevel: specs?.noiseLevel,
    dimensions: specs?.dimensions,
    height: specs?.height,
    weight: specs?.weight,
  };
};

export default parseCoolingPage;
