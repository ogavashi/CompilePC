import { Page } from 'puppeteer';
import { Case } from '../../../types';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { regexes, xPathSelectors } from '../common/constants';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import parseElementText from '../common/parseElementText';
import parseColorDivs from '../common/parseColorDivs';
import parsePrices from '../common/parsePrices';

const parseCasePage = async (
  productId: string,
  page: Page,
): Promise<Case | null> => {
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

  const booleanValues = await page.evaluate(() => {
    const classNamePattern = /prop-/i;
    return [...document.querySelectorAll('img')]
      .filter((element) => classNamePattern.test(element.className))
      .map((element) => element.className === 'prop-y');
  });

  if (!name || !mainImage || !rawSpecsTable) return null;

  const cleanedSpecsTable = cleanComplexTable(rawSpecsTable);

  const rawSpecs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');

    if (!name && !value) {
      return;
    }

    const camelName = camelize(name);
    rawSpecs.hasOwnProperty(camelName)
      ? (rawSpecs[`${camelName}Internal`] = removeNonBreakingSpace(value))
      : (rawSpecs[camelName] = removeNonBreakingSpace(value));
  });

  const colourArray = await parseColorDivs(xPathSelectors.caseColourDivs, page);

  if (colourArray) rawSpecs.colour = colourArray.join();

  const fansSizes = Object.keys(rawSpecs)
    .filter((key) => regexes.fansInCase.test(key))
    .map((key) => ({ [key]: rawSpecs[key] }));

  const liquidFansSizes = Object.keys(rawSpecs)
    .filter((key) => regexes.liquidFansInCase.test(key))
    .map((key) => ({ [key]: rawSpecs[key] }));

  const normalizedSpecs = Object.entries(rawSpecs).map(([key, value]) =>
    key !== 'colour' && !value ? [key, booleanValues.shift()] : [key, value],
  );

  const specs = Object.fromEntries(normalizedSpecs);

  const price = await parsePrices(page);

  const brand = name.split(' ')[0];

  return {
    id: productId,
    name,
    mainImage,
    brand,
    description: description || undefined,
    price,
    officialWebsite: specs?.officialWebsite,
    colour: specs?.colour,
    target: specs?.features,
    mount: specs?.mount,
    motherboardFormFactor: specs?.mount,
    boardPlacement: specs?.boardPlacement,
    psuMaxLength: specs?.psuMaxLength,
    gpuMaxLength: specs?.gpuMaxLength,
    rubberFeet: specs?.rubberFeet,
    PSU: specs?.PSU,
    psuMount: specs?.psuMount,
    expansionSlots: +specs?.expansionSlots,
    openMechanism: specs?.openMechanism,
    fansTotal: specs?.fansTotal,
    fansInfo: fansSizes,
    fansMountTotal: +specs?.fansMountTotal,
    gridFrontPanel: specs?.gridFrontPanel,
    dustFilter: specs?.dustFilter,
    liquidCoolingSupport: specs?.liquidCoolingSupport,
    liquidPlacement: specs?.placement,
    liquidCoolingMountsTotal: +specs?.liquidCoolingMounts,
    liquidCoolingInfo: liquidFansSizes,
    usb32Gen1: +specs?.uSB32Gen1,
    usb32Gen2: +specs?.uSB32Gen2,
    usb20: +specs?.usb20,
    audioPort: specs['audio(Microphoneheadphones)'],
    material: specs?.material,
    frontPanel: specs?.frontPanel,
    weight: specs?.weight,
    size: specs?.size,
  };
};

export default parseCasePage;
