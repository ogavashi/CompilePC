import { SolidStateDrive, ShortSpec } from '../../../../../../types/index';

const SSDFormer = (product: SolidStateDrive): ShortSpec[] => [
  { name: 'Capacity', value: product.capacity },
  { name: 'M2', value: product.m2Interface },
  { name: 'Form factor', value: product.formFactor },
];

export default SSDFormer;
