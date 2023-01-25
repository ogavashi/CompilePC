import {
  CategoryName,
  GraphicsCard,
  CPU,
  Part,
  ShortSpec,
  HardDrive,
  SolidStateDrive,
  PSU,
  RAM,
  Motherboard,
  Case,
  Cooling,
} from '../../../../../../types';
import CaseFormer from './CaseFormer';
import CoolingFormer from './CoolingForer';
import CPUFormer from './CPUformer';
import GPUFormer from './GPUformer';
import HDDFormer from './HDDformer';
import MBFormer from './MBFormer';
import PSUFormer from './PSUformer';
import RAMFormer from './RAMformer';
import SSDFormer from './SSDformer';

const getShortSpecs = (
  product: Part | null,
  category: CategoryName,
): ShortSpec[] | null => {
  if (!product) return null;
  switch (category) {
    case 'CPU':
      return CPUFormer(product as CPU);
    case 'GPU':
      return GPUFormer(product as GraphicsCard);
    case 'HDD':
      return HDDFormer(product as HardDrive);
    case 'SSD':
      return SSDFormer(product as SolidStateDrive);
    case 'PSU':
      return PSUFormer(product as PSU);
    case 'RAM':
      return RAMFormer(product as RAM);
    case 'motherboard':
      return MBFormer(product as Motherboard);
    case 'case':
      return CaseFormer(product as Case);
    case 'cooling':
      return CoolingFormer(product as Cooling);
    default:
      return null;
  }
};

export default getShortSpecs;
