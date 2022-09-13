import { Page } from 'puppeteer';
import { Cooling } from '../../../types';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { xPathSelectors } from '../common/constants';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import parseElementText from '../common/parseElementText';
import parsePrices from '../common/parsePrices';

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

  const price = await parsePrices(page);

  console.log(price);

  return {
    id: productId,
    name,
    mainImage,
    price,
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
