import { Page } from 'puppeteer';
import parseElementText from '../common/parseElementText';

const parseCPUPage = async (page: Page) => {
  const mainText = await parseElementText('.op1-tt', page);

  console.log(mainText);

  return mainText;
};

export default parseCPUPage;
