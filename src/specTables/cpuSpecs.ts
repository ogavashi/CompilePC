import { CPU, SpecBlock } from '../../types';

const formCPUSpecs = (product: CPU): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Series',
        value: product.series,
      },
      {
        title: 'Socket',
        value: product.socket,
      },
      {
        title: 'Litography',
        value: product.litography,
      },
      {
        title: 'Code name',
        value: product.codeName,
      },
    ],
  },
  {
    name: 'Cores and Threads',
    specs: [
      {
        title: 'Cores',
        value: product.cores,
      },
      {
        title: 'Threads',
        value: product.threads,
      },
    ],
  },
  {
    name: 'Speed',
    specs: [
      {
        title: 'Clock speed',
        value: product.clockSpeed,
      },
      {
        title: 'TurboBoost',
        value: product.turboBoost,
      },
    ],
  },
  {
    name: 'Cache',
    specs: [
      {
        title: 'Total L1 cache',
        value: product.l1Cache,
      },
      {
        title: 'Total L2 cache',
        value: product.l2Cache,
      },
      {
        title: 'Total L3 cache',
        value: product.l3Cache,
      },
    ],
  },
  {
    name: 'Specs',
    specs: [
      {
        title: 'IGP',
        value: product.IGP,
      },
      {
        title: 'TDP',
        value: product.TDP,
      },
      {
        title: 'PCI Express',
        value: product.PSIExpress,
      },
      {
        title: 'Max. operating temperature',
        value: product.maxOperatingTemperature,
      },
    ],
  },
  {
    name: 'Memory',
    specs: [
      {
        title: 'Max. DDR4 speed',
        value: product.maxDDR4Speed,
      },
      {
        title: 'Channels',
        value: product.channels,
      },
    ],
  },
];

export default formCPUSpecs;
