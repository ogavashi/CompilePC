import { Page } from 'puppeteer';
import parseElementText from '../common/parseElementText';
import { HardDrive } from '../../../types';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import camelize from '../common/camelize';
import cleanSimpleTable from '../common/cleanSimpleTable';
import cleanComplexTable from '../common/cleanComplexTable';

const parseHardDrivePage = async (
  productId: string,
  page: Page,
): Promise<HardDrive | null> => {
  const name = await parseElementText('.op1-tt', page);

  const mainImageContainer = await getParsingElement('.img200', page);
  const mainImage = await page.evaluate(
    (el) => el.lastElementChild.getAttribute('srcset').split(' ')[0],
    mainImageContainer,
  );

  const description = await parseElementInnerHTML('.conf-desc-ai-title', page);

  const specsTable = await getParsingElement('#help_table', page);

  const rawSpecsTable = await page.evaluate(async (node) => {
    async function getNodeTreeText(inputNode: Element): Promise<string | null> {
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
      ? (specs[`${camelName}Dimensions`] = value)
      : (specs[camelName] = value);
  });

  return {
    id: productId,
    name,
    mainImage,
    description: description || undefined,
    placement: specs.placement,
    type: specs.type,
    capacity: specs.size,
    formFactor: specs.formFactor,
    cacheMemory: specs.cacheMemory,
    recordTechnology: specs.recordTechnology,
    RPM: specs.RPM,
    dataTransferRate: specs.dataTransferRate,
    operationPowerConsumption: specs.operationPowerConsumption,
    standbyPowerConsumption: specs.standbyPowerConsumption,
    MTBF: specs.MTBF,
    size: specs.sizeDimensions,
    weight: specs.weight,
  };
};

export default parseHardDrivePage;
