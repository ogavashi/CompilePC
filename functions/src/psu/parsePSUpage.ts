import { Page } from 'puppeteer';
import { PSU } from '../../../types';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import parseElementText from '../common/parseElementText';
import cleanSimpleTable from '../common/cleanSimpleTable';

const parsePSUpage = async (
  productId: string,
  page: Page,
): Promise<PSU | null> => {
  const description = await parseElementInnerHTML('.conf-desc-ai-title', page);

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

  const isTableSimple = !!(await page.$('.one-col'));

  const cleanedSpecsTable = isTableSimple
    ? cleanSimpleTable(rawSpecsTable)
    : cleanComplexTable(rawSpecsTable);

  const specs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');

    if (!name && !value) {
      return;
    }

    const camelName = camelize(name);
    specs.hasOwnProperty(camelName)
      ? (specs[`${camelName}Dimensions`] = removeNonBreakingSpace(value))
      : (specs[camelName] = removeNonBreakingSpace(value));
  });

  return {
    id: productId,
    name,
    mainImage,
    description: description || undefined,
    officialWebsite: specs?.officialWebsite,
    power: specs?.power,
    formFactor: specs?.formFactor,
    PFC: specs?.PFC,
    efficiency: specs?.efficiency,
    coolingSystem: specs?.coolingSystem,
    fanSize: specs?.fanSize,
    fanBearings: specs?.fanBearing,
    certification: specs?.certification,
    atx12vVersion: +specs?.aTX12VVersion,
    powerSupply: specs?.mBCPUPowerSupply,
    SATA: +specs?.SATA,
    MOLEX: +specs?.MOLEX,
    PCIE8pin: +specs['pCIE8pin(6+2)'],
    cableSystem: specs?.cableSystem,
    braidedWires: !specs?.braidedWires,
    mbCableLength: specs?.MB,
    cpuCableLength: specs?.CPU,
    sataCableLength: specs?.SATADimensions,
    molexCableLength: specs?.MOLEXDimensions,
    PCIECableLength: specs['PCI-E'],
  };
};

export default parsePSUpage;
