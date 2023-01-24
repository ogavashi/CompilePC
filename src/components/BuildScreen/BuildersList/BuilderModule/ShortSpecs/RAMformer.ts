import { RAM, ShortSpec } from '../../../../../../types/index';

const RAMFormer = (product: RAM): ShortSpec[] => [
  { name: 'Clock speed', value: product.clockSpeed },
  { name: 'Capacity', value: product.capacity },
  { name: 'Modules number', value: product.modules },
];

export default RAMFormer;
