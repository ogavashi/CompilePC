import { Page } from 'puppeteer';
import { Motherboard, MotherboardFormFactor } from '../../../types';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { xPathSelectors } from '../common/constants';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import parseElementText from '../common/parseElementText';
import parsePrices from '../common/parsePrices';

const parseMotherboardPage = async (
  productId: string,
  page: Page,
): Promise<Motherboard | null> => {
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

    if (!name && !value) {
      return;
    }

    const camelName = camelize(name);
    specs.hasOwnProperty(camelName)
      ? (specs[`${camelName}Internal`] = removeNonBreakingSpace(value))
      : (specs[camelName] = removeNonBreakingSpace(value));
  });

  const price = await parsePrices(page);

  const brand = name.split(' ')[0];

  return {
    id: productId,
    name,
    mainImage,
    price,
    brand,
    description: description || undefined,
    socket: specs?.socket,
    formFactor: specs?.formFactor as MotherboardFormFactor,
    powerPhases: specs?.powerPhases,
    VRMHeatsink: !!!specs?.vRMHeatsink,
    size: specs?.['size(HxW)'], // e.g. 226x211 mm
    chipset: specs?.chipset,
    BIOS: specs?.BIOS,
    DDR4: specs?.DDR4,
    memoryModule: specs?.memoryModule,
    operationMode: specs?.operationMode,
    maxClockFrequency: specs?.maxClockFrequency,
    maxMemory: specs?.maxMemory,
    VGA: !!!specs?.['dSubOutput(VGA)'],
    HDMI: !!!specs?.hDMIOutput,
    HDMIVersion: specs?.hDMIVersion,
    displayPort: !!!specs?.displayPort,
    displayPortVersion: specs?.displayPortVersion,
    audiochip: specs?.audiochip,
    sound: specs?.['sound(Channels)'],
    sata3: specs?.['sATA3(6Gbs)'],
    m2: specs?.['M.2'],
    PSI_E_16x: specs?.pCIE16xSlots,
    PCIExpressVerison: specs?.pCIExpress,
    ExternalUSB_2_0: specs?.['USB 2.0'],
    ExternalUSB_3_2_gen1: specs?.uSB32Gen1,
    ExternalUSB_3_2_gen2: specs?.uSB32Gen2,
    InternalUSB_2_0: specs?.['USB 2.0Internal'],
    InternalUSB_3_2_gen1: specs?.uSB32Gen1Internal,
    InternalUSB_3_2_gen2: specs?.uSB32Gen2Internal,
    mainPowerSocket: specs?.mainPowerSocket,
    CPUPowerSocket: specs?.cPUPower,
    FanPowerConnectors: specs?.FanPowerConnectors,
  };
};

export default parseMotherboardPage;
