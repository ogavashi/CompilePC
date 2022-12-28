import { CPU, ShortSpec } from '../../../../../../types/index';

const CPUFormer = (product: CPU): ShortSpec[] => [
  { name: 'Series', value: product.series },
  { name: 'Socket', value: product.socket },
  { name: 'Threads', value: product.threads },
];

export default CPUFormer;
