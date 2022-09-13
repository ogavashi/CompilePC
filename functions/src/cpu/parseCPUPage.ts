import { Page } from 'puppeteer';
import parseElementText from '../common/parseElementText';
import { CPU } from '../../../types';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import parsePrices from '../common/parsePrices';

const parseCPUPage = async (
  productId: string,
  page: Page,
): Promise<CPU | null> => {
  const name = await parseElementText('.op1-tt', page);

  const mainImageContainer = await getParsingElement('.img200', page);
  const mainImage = await page.evaluate(
    (el) => el.lastElementChild.getAttribute('srcset').split(' ')[0],
    mainImageContainer,
  );

  const description = await parseElementInnerHTML('.desc-exp-text', page);

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

  const price = await parsePrices(page);

  return {
    id: productId,
    name,
    mainImage,
    description: description || undefined,
    price,
    officialWebsite: specs?.officialWebsite,
    manufacturer: specs?.manufacturer,
    series: specs?.series,
    codeName: specs?.codeName,
    socket: specs?.socket,
    litography: specs?.litography,
    cores: specs?.cores,
    threads: specs?.threads,
    clockSpeed: specs?.clockSpeed,
    turboBoost: specs?.turboBoostTurboCore,
    l1Cache: specs?.totalL1Cache,
    l2Cache: specs?.totalL2Cache,
    l3Cache: specs?.totalL2Cache,
    IGP: specs?.IGP,
    TDP: specs?.TDP,
    PSIExpress: specs?.pCIExpress,
    maxOperatingTemperature: specs?.maxOperatingTemperature,
    maxDDR4Speed: specs?.maxDDR4Speed,
    channels: specs?.channels,
  };
};

export default parseCPUPage;
