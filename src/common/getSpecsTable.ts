import { ProductCategory, SpecBlock, GraphicsCard } from '../../types';
import formGPUSpecs from '../specTables/gpuSpecs';

export enum Categories {
  CPU = 'CPUs',
  PSU = 'PSUs',
  RAM = 'RAM',
  Case = 'cases',
  Cooling = 'coolings',
  GPU = 'graphicsCards',
  Motherboard = 'motherboards',
  SSD = 'solidStateDrives',
  HDD = 'HardDrives',
}

const getSpecsTable = (
  product: ProductCategory,
  category: Categories,
): SpecBlock[] | null => {
  switch (category) {
    case Categories.CPU:
      return null;
    case Categories.GPU:
      return formGPUSpecs(product as GraphicsCard);
    case Categories.PSU:
      return null;
    case Categories.RAM:
      return null;
    case Categories.Case:
      return null;
    case Categories.Cooling:
      return null;
    case Categories.Motherboard:
      return null;
    case Categories.SSD:
      return null;
    case Categories.HDD:
      return null;
    default:
      return null;
  }
};

export default getSpecsTable;
