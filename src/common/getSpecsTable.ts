import {
  SpecBlock,
  GraphicsCard,
  FetchedProduct,
  ProductCategory,
} from '../../types';
import formGPUSpecs from '../specTables/gpuSpecs';

enum ProductCategories {
  CPU = 'CPU',
  GPU = 'GPU',
  RAM = 'RAM',
  HDD = 'HDD',
  SSD = 'SSD',
  case = 'case',
  cooling = 'cooling',
  motherboard = 'motherboard',
  PSU = 'PSU',
}

const getSpecsTable = (
  product: FetchedProduct,
  category: ProductCategory,
): SpecBlock[] | null => {
  switch (category) {
    case ProductCategories.CPU:
      return null;
    case ProductCategories.GPU:
      return formGPUSpecs(product as GraphicsCard);
    case ProductCategories.PSU:
      return null;
    case ProductCategories.RAM:
      return null;
    case ProductCategories.case:
      return null;
    case ProductCategories.cooling:
      return null;
    case ProductCategories.motherboard:
      return null;
    case ProductCategories.SSD:
      return null;
    case ProductCategories.HDD:
      return null;
    default:
      return null;
  }
};

export default getSpecsTable;
