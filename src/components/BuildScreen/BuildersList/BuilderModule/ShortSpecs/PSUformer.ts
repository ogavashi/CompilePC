import { PSU, ShortSpec } from '../../../../../../types/index';

const PSUFormer = (product: PSU): ShortSpec[] => [
  { name: 'Efficiency', value: product.efficiency },
  { name: 'Power', value: product.power },
  { name: 'Form factor', value: product.formFactor },
];

export default PSUFormer;
