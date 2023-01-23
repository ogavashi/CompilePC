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
  pricesButton: "//div[@class='desc-menu']/a[@title='View all stores offers']",
  loadMoreButton: "//div[@class='list-more-div']",
  priceDiv: "//td[@class='where-buy-price']/a",
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

export const ProductCategories = {
  CPU: {
    categoryName: 'CPU',
    builderTitle: 'CPU',
    collectionName: 'CPUs',
  },
  GPU: {
    categoryName: 'GPU',
    builderTitle: 'Graphic card',
    collectionName: 'graphicsCards',
  },
  PSU: {
    categoryName: 'PSU',
    builderTitle: 'Power suply unit',
    collectionName: 'PSUs',
  },
  RAM: {
    categoryName: 'RAM',
    builderTitle: 'RAM',
    collectionName: 'RAM',
  },
  case: {
    categoryName: 'case',
    builderTitle: 'Case',
    collectionName: 'cases',
  },
  cooling: {
    categoryName: 'cooling',
    builderTitle: 'Cooling',
    collectionName: 'coolings',
  },
  motherboard: {
    categoryName: 'motherboard',
    builderTitle: 'Motherboard',
    collectionName: 'motherboards',
  },
  SSD: {
    categoryName: 'SSD',
    builderTitle: 'SSD',
    collectionName: 'SSD',
  },
  HDD: {
    categoryName: 'HDD',
    builderTitle: 'HDD',
    collectionName: 'HDD',
  },
} as const;
