import parseCPUPage from '../cpu/parseCPUPage';

export const DEFAULT_REGION = 'europe-central2';
export const EKATALOG_LINK = 'https://ek.ua';
export const EKATALOG_LIST_LINK = `${EKATALOG_LINK}/en/list/`;
export const CATEGORIES_COLLECTION_NAME = 'categories';
export const DB_NAME = 'CompilePC';

export const RAM_COLOR_DIVS = '.small-col-plate2';
export const CASE_COLOR_DIVS = '.descr-color';

export const parserByCategoryId: Record<string, CallableFunction> = {
  186: parseCPUPage,
};

export const xPathSelectors: Record<string, string> = {
  specificationButton:
    "//div[@class='desc-menu']/a[contains(., 'Specifications')]",
  ramColourDivs: "//td[@class='small-col-plate2']/div",
  caseColourDivs: "//td[@class=' color-plate descr-color']/div",
};

export const regexes: Record<string, RegExp> = {
  camelizeClean: /[./-]/g,
  cleanLinkForProductId: /\/en\/|.htm/g,
  nonBreakingSpace: /\xA0/g,
  numericFormat: /^[0-9]*$/,
  fansInCase: /fans\(.*\)/i,
  liquidFansInCase: /liquidCooling\(.*\)/i,
};
