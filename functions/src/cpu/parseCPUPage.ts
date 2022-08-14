import { Page } from 'puppeteer';
import parseElementText from '../common/parseElementText';
import { CPU } from '../../../types';
// import parseElementAttribute from '../common/parseElementAttribute';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';

const parseCPUPage = async (page: Page): Promise<CPU | null> => {
  const name = await parseElementText('.op1-tt', page);

  const mainImageContainer = await getParsingElement('.img200', page);
  const mainImage = await page.evaluate(
    (el) => el.lastElementChild.getAttribute('srcset').split(' ')[0],
    mainImageContainer,
  );
  const description = await parseElementInnerHTML('.desc-exp-text', page);

  console.log(description);
  if (!name || !mainImage || !description) return null;

  return {
    id: 'string',
    name,
    mainImage,
    description,
    officialWebsite: 'string',
    manufacturer: 'string',
    series: 'string',
    codeName: 'string',
    socket: 'string',
    litography: 0,
    cores: 0,
    threads: 0,
    clockSpeed: 0,
    turboBoost: 0,
    l1Cache: 0,
    l2Cache: 0,
    l3Cache: 0,
    IGP: 'string',
    TDP: 0,
    PSIExpress: 'string',
    maxOperatingTemperature: 'string',
    maxDDR4Speed: 'string',
    channels: 'string',
  };
};

export default parseCPUPage;
