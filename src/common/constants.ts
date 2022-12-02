import { BuilderCategory, ProductCategory } from '../../types';

const DEFAULT_REGION = 'europe-central2';

const ProductCategoryByCollection: Record<string, BuilderCategory> = {
  CPUs: 'CPU',
  GraphicsCards: 'Graphic card',
  Motherboards: 'Motherboard',
  RAM: 'RAM',
  HardDrives: 'HDD',
};

enum ProductCollections {
  CPU = 'CPUs',
  GPU = 'graphicsCards',
  PSU = 'PSUs',
  RAM = 'RAM',
  case = 'cases',
  cooling = 'coolings',
  motherboard = 'motherboards',
  ssd = 'solidStateDrives',
  hdd = 'hardDrives',
}

const CollectionByProductCategory: Record<ProductCategory, ProductCollections> =
  {
    CPU: ProductCollections.CPU,
    GPU: ProductCollections.GPU,
    PSU: ProductCollections.PSU,
    RAM: ProductCollections.RAM,
    case: ProductCollections.case,
    cooling: ProductCollections.cooling,
    motherboard: ProductCollections.motherboard,
    SSD: ProductCollections.ssd,
    HDD: ProductCollections.hdd,
  };

const NUMERIC_FORMAT = /^[0-9]*$/;

const MIN_PRICE_SLIDER_DISTANCE = 1000;
// eslint-disable-next-line import/prefer-default-export
export {
  DEFAULT_REGION,
  ProductCategoryByCollection,
  CollectionByProductCategory,
  MIN_PRICE_SLIDER_DISTANCE,
  NUMERIC_FORMAT,
};
