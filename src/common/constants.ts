import { Builder } from '../../types';

const DEFAULT_REGION = 'europe-central2';

const ProductCategoryByCollection: Record<string, Builder> = {
  CPUs: 'CPU',
  GraphicsCards: 'Graphic card',
  Motherboards: 'Motherboard',
  RAM: 'RAM',
  HardDrives: 'HDD',
};

const NUMERIC_FORMAT = /^[0-9]*$/;

const MIN_PRICE_SLIDER_DISTANCE = 1000;
// eslint-disable-next-line import/prefer-default-export
export {
  DEFAULT_REGION,
  ProductCategoryByCollection,
  MIN_PRICE_SLIDER_DISTANCE,
  NUMERIC_FORMAT,
};
