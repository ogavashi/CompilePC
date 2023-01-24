import { SpecBlock, GraphicsCard, Part, CategoryName, CPU } from '../../types';
import formCPUSpecs from './cpuSpecs';
import formGPUSpecs from './gpuSpecs';

const getSpecsTable = (
  product: Part | undefined,
  category: CategoryName,
): SpecBlock[] | null => {
  if (!product) return null;
  switch (category) {
    case 'CPU':
      return formCPUSpecs(product as CPU);
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
