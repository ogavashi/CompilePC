import { SpecBlock, GraphicsCard, FetchedProduct } from '../../types';
import formGPUSpecs from '../specTables/gpuSpecs';
import { ProductCategories } from './constants';

export type ProductCategory = keyof typeof ProductCategories;

const getSpecsTable = (
  product: FetchedProduct,
  category: ProductCategory,
): SpecBlock[] | null => {
  switch (category) {
    case 'CPU':
      return null;
    case 'GPU':
      return formGPUSpecs(product as GraphicsCard);
    case 'HDD':
      return null;
    case 'SSD':
      return null;
    case 'PSU':
      return null;
    case 'RAM':
      return null;
    case 'motherboard':
      return null;
    case 'case':
      return null;
    case 'cooling':
      return null;
    default:
      return null;
  }
};

export default getSpecsTable;
