import { Motherboard, ShortSpec } from '../../../../../../types/index';

const MBFormer = (product: Motherboard): ShortSpec[] => [
  { name: 'Chipset', value: product.chipset },
  { name: 'Max memory', value: product.maxMemory },
  { name: 'Form factor', value: product.formFactor },
];

export default MBFormer;
