import { CategoryName, CPU, Part, ShortSpec } from '../../../../../../types';
import CPUFormer from './CPUformer';

const getShortSpecs = (
  product: Part | null,
  category: CategoryName,
): ShortSpec[] | null => {
  if (!product) return null;
  switch (category) {
    case 'CPU':
      return CPUFormer(product as CPU);
    case 'GPU':
      return null;
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

export default getShortSpecs;
