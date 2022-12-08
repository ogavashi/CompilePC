import { GraphicsCard, SpecBlock } from '../../types';

const formGPUSpecs = (product: GraphicsCard): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Interface',
        value: product.interface,
      },
    ],
  },
  {
    name: 'GPU',
    specs: [
      {
        title: 'GPU model',
        value: product.GPUModel,
      },
      {
        title: 'Memory size',
        value: product.memorySize,
      },
      {
        title: 'Memory type',
        value: product.memoryType,
      },
      {
        title: 'Memory bus',
        value: product.memoryBus,
      },
      {
        title: 'GPU clock speed',
        value: product.GPUClockSpeed,
      },
    ],
  },
  {
    name: 'Connections',
    specs: [
      {
        title: 'HDMI',
        value: product.GPUModel,
      },
      {
        title: 'HDMI version',
        value: product.memorySize,
      },
      {
        title: 'DisplayPort',
        value: product.memoryType,
      },
      {
        title: 'DisplayPort version',
        value: product.memoryBus,
      },
    ],
  },
  {
    name: 'Software',
    specs: [
      {
        title: 'DirectX',
        value: product.directX,
      },
      {
        title: 'OpenGL',
        value: product.openGL,
      },
      {
        title: 'VR',
        value: product.isVRReady,
      },
      {
        title: 'Stream processors',
        value: product.streamProcessors,
      },
      {
        title: 'Texture units',
        value: product.textureUnits,
      },
    ],
  },
  {
    name: 'General',
    specs: [
      {
        title: 'Monitors connection',
        value: product.monitorsConnection,
      },
      {
        title: 'Cooling',
        value: product.cooling,
      },
      {
        title: 'Fans',
        value: product.fans,
      },
      {
        title: 'Minimum PSU recommendation',
        value: product.minPSU,
      },
      {
        title: 'Additional power',
        value: product.additionalPower,
      },
      {
        title: 'Number of slots',
        value: product.numberOfSlots,
      },
      {
        title: 'Length',
        value: product.size,
      },
    ],
  },
];

export default formGPUSpecs;
