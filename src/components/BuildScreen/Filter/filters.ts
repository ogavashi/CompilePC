import { CategoryName } from '../../../../types/index';

export type FilterOption = {
  key: string;
  value: string;
};

export type Filter = {
  title: string;
  key: string;
  options: FilterOption[];
};

export type CategoryFilterBatch = {
  [key in CategoryName]: { accordion?: Filter[]; switcher?: Filter[] };
};

export const filters: CategoryFilterBatch = {
  CPU: {
    accordion: [
      {
        title: 'Clock Speed',
        key: 'clockSpeed',
        options: [
          { value: '1.5 GHz - 1.99 GHz', key: '1.5-1.9-GHz' },
          { value: '2.0 GHz - 2.49 GHz', key: '2.0-2.4-GHz' },
          { value: '2.5 GHz - 2.99 GHz', key: '2.5-2.9-GHz' },
          { value: '3.0 GHz and higher', key: '3.0-5.0-GHz' },
        ],
      },
      {
        title: 'Threads Number',
        key: 'threads',
        options: [
          { value: '4 threads', key: '4 threads' },
          { value: '8 threads', key: '8 threads' },
          { value: '12 threads', key: '12 threads' },
          { value: '16 threads', key: '16 threads' },
        ],
      },
      {
        title: 'Cores Number',
        key: 'cores',
        options: [
          { value: '4 cores', key: '4 cores' },
          { value: '8 cores', key: '8 cores' },
          { value: '12 cores', key: '12 cores' },
          { value: '16 cores', key: '16 cores' },
        ],
      },
    ],
    switcher: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: 'INTEL', key: 'Intel' },
          { value: 'AMD', key: 'AMD' },
        ],
      },
    ],
  },
  GPU: {
    accordion: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: 'Intel', key: 'Intel' },
          { value: 'AMD', key: 'AMD' },
          { value: 'Nvidia', key: 'NVIDIA' },
        ],
      },
      {
        title: 'Vendor',
        key: 'vendor',
        options: [
          { value: 'Asus', key: 'Asus' },
          { value: 'Palit', key: 'Palit' },
          { value: 'Gigabyte', key: 'Gigabyte' },
          { value: 'MSI', key: 'MSI' },
        ],
      },
      {
        title: 'Chip',
        key: 'GPUModel',
        options: [
          { value: 'GeForce RTX 3050', key: 'NVIDIA GeForce RTX 3050' },
          { value: 'GeForce RTX 3060', key: 'NVIDIA GeForce RTX 3060' },
          { value: 'GeForce RTX 3060 Ti', key: 'NVIDIA GeForce RTX 3060 Ti' },
          { value: 'GeForce RTX 3070', key: 'NVIDIA GeForce RTX 3070' },
          { value: 'GeForce RTX 3080', key: 'NVIDIA GeForce RTX 3080' },
          { value: 'GeForce GTX 1650', key: 'NVIDIA GeForce GTX 1650' },
          { value: 'GeForce GTX 1050 Ti', key: 'NVIDIA GeForce GTX 1050 Ti' },
          {
            value: 'GeForce GTX 1660 SUPER',
            key: 'NVIDIA GeForce GTX 1660 SUPER',
          },
        ],
      },
      {
        title: 'Memory',
        key: 'memorySize',
        options: [
          { value: '4 GB', key: '4 GB' },
          { value: '6 GB', key: '6 GB' },
          { value: '8 GB', key: '8 GB' },
          { value: '12 GB', key: '12 GB' },
          { value: '16 GB', key: '16 GB' },
          { value: '24 GB', key: '24 GB' },
        ],
      },
      {
        title: 'Memory bus',
        key: 'memoryBus',
        options: [
          { value: '128 bit', key: '128 bit' },
          { value: '192 bit', key: '192 bit' },
          { value: '256 bit', key: '256 bit' },
        ],
      },
      {
        title: 'Memory type',
        key: 'memoryType',
        options: [
          { value: 'GDDR5', key: 'GDDR5' },
          { value: 'GDDR6', key: 'GDDR6' },
          { value: 'GDDR6X', key: 'GDDR6X' },
        ],
      },
      {
        title: 'Number of fans',
        key: 'fans',
        options: [
          { value: '1 fan', key: '1' },
          { value: '2 fans', key: '2' },
          { value: '3 fans', key: '3' },
          { value: '4 fans', key: '4' },
        ],
      },
    ],
  },
  motherboard: {
    accordion: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: 'Asus', key: 'Asus' },
          { value: 'Gigabyte', key: 'Gigabyte' },
          { value: 'MSI', key: 'MSI' },
        ],
      },
      {
        title: 'Socket',
        key: 'socket',
        options: [
          { value: 'Intel LGA 1200', key: 'Intel LGA 1200' },
          { value: 'Intel LGA 1700', key: 'Intel LGA 1700' },
          { value: 'Intel LGA 1151 v2', key: 'Intel LGA 1151 v2' },
          { value: 'AMD AM4', key: 'AMD AM4' },
        ],
      },
      {
        title: 'Form factor',
        key: 'formFactor',
        options: [
          { value: 'mini-ITX', key: 'mini-ITX' },
          { value: 'micro-ATX', key: 'micro-ATX' },
          { value: 'ATX', key: 'ATX' },
        ],
      },
      {
        title: 'Memory slots (DDR4)',
        key: 'DDR4',
        options: [
          { value: '1 slot', key: '1 slot(s)' },
          { value: '2 slots', key: '2 slot(s)' },
          { value: '4 slots', key: '4 slot(s)' },
        ],
      },
      {
        title: 'Memory slots (DDR3)',
        key: 'DDR3',
        options: [
          { value: '1 slot', key: '1 slot(s)' },
          { value: '2 slots', key: '2 slot(s)' },
          { value: '4 slots', key: '4 slot(s)' },
        ],
      },
    ],
  },
  RAM: {
    accordion: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: 'G.Skill', key: 'G.Skill' },
          { value: 'GOODRAM', key: 'GOODRAM' },
          { value: 'Patriot Memory', key: 'Patriot Memory' },
          { value: 'Corsair', key: 'Corsair' },
          { value: 'Kingston Fury', key: 'Kingston Fury' },
          { value: 'Team Group', key: 'Team Group' },
          { value: 'Samsung', key: 'Samsung' },
        ],
      },
      {
        title: 'Capacity',
        key: 'capacity',
        options: [
          { value: '1 GB', key: '1 GB' },
          { value: '2 GB', key: '2 GB' },
          { value: '4 GB', key: '4 GB' },
          { value: '8 GB', key: '8 GB' },
          { value: '16 GB', key: '16 GB' },
          { value: '32 GB', key: '32 GB' },
          { value: '64 GB', key: '64 GB' },
        ],
      },
      {
        title: 'Modules',
        key: 'modules',
        options: [
          { value: '1 Stick', key: '1' },
          { value: '2 Sticks', key: '2' },
          { value: '4 Sticks', key: '4' },
        ],
      },
      {
        title: 'Speed',
        key: 'speed',
        options: [
          { value: '1600 MHz', key: '1600 MHz' },
          { value: '2666 MHz', key: '2666 MHz' },
          { value: '3200 MHz', key: '3200 MHz' },
          { value: '3600 MHz', key: '3600 MHz' },
          { value: '6000 MHz', key: '6000 MHz' },
        ],
      },
    ],
  },
  HDD: {
    accordion: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: 'A-Data', key: 'A-Data' },
          { value: 'Apacer', key: 'Apacer' },
          { value: 'Seagate', key: 'Seagate' },
          { value: 'Toshiba', key: 'Toshiba' },
          { value: 'Transcend', key: 'Transcend' },
          { value: 'Western Digital', key: 'WD' },
        ],
      },
      {
        title: 'Form factor',
        key: 'formFactor',
        options: [
          { value: '2.5 "', key: '2.5 "' },
          { value: '3.5 "', key: '3.5 "' },
        ],
      },
      {
        title: 'Capacity',
        key: 'capacity',
        options: [
          { value: '1 TB', key: '1000 GB' },
          { value: '2 TB', key: '2000 GB' },
          { value: '3 TB', key: '3000 GB' },
          { value: '4 TB', key: '4000 GB' },
          { value: '6 TB', key: '6000 GB' },
          { value: '8 TB', key: '8000 GB' },
          { value: '10 TB', key: '10000 GB' },
          { value: '12 TB', key: '12000 GB' },
          { value: '14 TB', key: '14000 GB' },
          { value: '16 TB', key: '16000 GB' },
          { value: '18 TB', key: '18000 GB' },
        ],
      },
      {
        title: 'Revolutions per minute',
        key: 'RPM',
        options: [
          { value: '5400 RPM', key: '5400 rpm' },
          { value: '7200 RPM', key: '7200 rpm' },
        ],
      },
    ],
  },
  SSD: {
    accordion: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: 'Kingston', key: 'Kingston' },
          { value: 'Samsung', key: 'Samsung' },
          { value: 'MSI', key: 'MSI' },
          { value: 'Team Group', key: 'Team Group' },
          { value: 'Kingston Fury', key: 'Kingston Fury' },
          { value: 'Toshiba', key: 'Toshiba' },
          { value: 'Intel', key: 'Intel' },
          { value: 'Western Digital', key: 'WD' },
        ],
      },
      {
        title: 'Capacity',
        key: 'capacity',
        options: [
          { value: '120 GB', key: '120 GB' },
          { value: '240 GB', key: '240 GB' },
          { value: '256 GB', key: '256 GB' },
          { value: '480 GB', key: '480 GB' },
          { value: '500 GB', key: '500 GB' },
          { value: '512 GB', key: '512 GB' },
          { value: '1000 GB', key: '1000 GB' },
          { value: '1024 GB', key: '1024 GB' },
          { value: '2048 GB', key: '2048 GB' },
        ],
      },
      {
        title: 'Form factor',
        key: 'formFactor',
        options: [
          { value: 'M.2', key: 'M.2' },
          { value: '2.5"', key: '2.5"' },
          { value: '256 GB', key: '256 GB' },
          { value: '480 GB', key: '480 GB' },
          { value: '500 GB', key: '500 GB' },
          { value: '512 GB', key: '512 GB' },
          { value: '1000 GB', key: '1000 GB' },
          { value: '1024 GB', key: '1024 GB' },
          { value: '2048 GB', key: '2048 GB' },
        ],
      },
    ],
  },
  PSU: {
    accordion: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: 'Chieftec', key: 'Chieftec' },
          { value: 'Gamemax', key: 'Gamemax' },
          { value: 'Asus', key: 'Asus' },
          { value: 'Seasonic', key: 'Seasonic' },
          { value: 'Cougar', key: 'Cougar' },
          { value: 'Deepcool', key: 'Deepcool' },
          { value: 'Thermaltake', key: 'Thermaltake' },
          { value: 'be quiet!', key: 'be quiet!' },
          { value: 'cooler-master', key: 'COOLER-MASTER' },
          { value: 'Corsair', key: 'Corsair' },
        ],
      },
      {
        title: 'Power',
        key: 'power',
        options: [
          { value: '500 W', key: '500 W' },
          { value: '600 W', key: '600 W' },
          { value: '650 W', key: '650 W' },
          { value: '700 W', key: '700 W' },
          { value: '750 W', key: '750 W' },
          { value: '850 W', key: '850 W' },
          { value: '1000 W', key: '1000 W' },
        ],
      },
      {
        title: 'Form factor',
        key: 'formFactor',
        options: [
          { value: 'mini-ITX', key: 'mini-ITX' },
          { value: 'micro-ATX', key: 'micro-ATX' },
          { value: 'ATX', key: 'ATX' },
        ],
      },
      {
        title: 'Cable system',
        key: 'cableSystem',
        options: [
          { value: 'modular', key: 'modular' },
          { value: 'not modular', key: 'micro-ATX' },
        ],
      },
    ],
  },
  case: {
    accordion: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: '2E', key: '2E' },
          { value: 'Frontier', key: 'Frontier' },
          { value: 'be quiet!', key: 'be quiet!' },
          { value: 'Deepcool', key: 'Deepcool' },
          { value: '1stPlayer', key: '1stPlayer' },
          { value: 'Tecware', key: 'Tecware' },
          { value: 'Aerocool', key: 'Aerocool' },
          { value: 'Vinga', key: 'Vinga' },
          { value: 'Vinga', key: 'Vinga' },
          { value: 'KRUX', key: 'KRUX' },
        ],
      },
      {
        title: 'Expansion slots',
        key: 'expansionSlots',
        options: [
          { value: '3', key: '3' },
          { value: '4', key: '4' },
          { value: '5', key: '5' },
          { value: '6', key: '6' },
          { value: '7', key: '7' },
        ],
      },
    ],
  },
  cooling: {
    accordion: [
      {
        title: 'Brand',
        key: 'brand',
        options: [
          { value: 'Arctic', key: 'Arctic' },
          { value: 'ID-COOLING', key: 'ID-COOLING' },
          { value: 'be quiet!', key: 'be quiet!' },
          { value: 'Deepcool', key: 'Deepcool' },
          { value: 'QUBE', key: 'QUBE' },
          { value: 'Gamemax', key: 'Gamemax' },
          { value: 'Aerocool', key: 'Aerocool' },
          { value: 'Corsair', key: 'Corsair' },
          { value: 'MSI', key: 'MSI' },
          { value: 'Asus', key: 'Asus' },
        ],
      },
      {
        title: 'Cooling type',
        key: 'type',
        options: [
          { value: 'Active cooler', key: 'active cooler' },
          { value: 'Fan', key: 'fan' },
          { value: 'Water cooling', key: 'water cooling' },
        ],
      },
      {
        title: 'Targeting',
        key: 'target',
        options: [
          { value: 'CPU', key: 'CPU' },
          { value: 'Case', key: 'body' },
        ],
      },
    ],
  },
};
