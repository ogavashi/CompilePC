import {
  SpecBlock,
  GraphicsCard,
  Part,
  CategoryName,
  CPU,
  HardDrive,
  SolidStateDrive,
} from '../../types';
import formCPUSpecs from './cpuSpecs';
import formGPUSpecs from './gpuSpecs';
import formHDDSpecs from './hddSpecs';
import formSSDSpecs from './ssdSpecs';

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
      return formHDDSpecs(product as HardDrive);
    case 'SSD':
      return formSSDSpecs(product as SolidStateDrive);
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
