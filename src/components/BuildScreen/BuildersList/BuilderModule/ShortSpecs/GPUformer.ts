import { GraphicsCard, ShortSpec } from '../../../../../../types/index';

const GPUFormer = (product: GraphicsCard): ShortSpec[] => [
  { name: 'Clock speed', value: product.GPUClockSpeed },
  { name: 'Memory size', value: product.memorySize },
  { name: 'Memory type', value: product.memoryType },
];

export default GPUFormer;
