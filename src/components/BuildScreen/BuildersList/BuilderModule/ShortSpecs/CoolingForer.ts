import { Cooling, ShortSpec } from '../../../../../../types/index';

const CoolingFormer = (product: Cooling): ShortSpec[] => [
  { name: 'Socket', value: product.socket.join(', ') },
  { name: 'Max TDP', value: product.maxTDP },
  { name: 'Max RPM', value: product.maxRPM },
];

export default CoolingFormer;
