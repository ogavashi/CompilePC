const DEFAULT_REGION = 'europe-central2';

const ProductCategoryByCollection = {
  CPUs: 'CPU',
  GraphicsCards: 'Graphic card',
  Motherboards: 'Motherboard',
  RAM: 'RAM',
  HardDrives: 'HDD',
};

const NUMERIC_FORMAT = /^[0-9]*$/;

const minSliderDistance = 1000;
// eslint-disable-next-line import/prefer-default-export
export {
  DEFAULT_REGION,
  ProductCategoryByCollection,
  minSliderDistance,
  NUMERIC_FORMAT,
};
