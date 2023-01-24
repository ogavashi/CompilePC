import { HardDrive, ShortSpec } from '../../../../../../types/index';

const HDDFormer = (product: HardDrive): ShortSpec[] => [
  { name: 'Capacity', value: product.capacity },
  { name: 'RPM', value: product.RPM },
  { name: 'Form factor', value: product.formFactor },
];

export default HDDFormer;
