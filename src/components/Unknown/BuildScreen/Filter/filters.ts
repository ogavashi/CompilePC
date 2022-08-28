import { Builders } from '../../../../../types/index';

export type FilterOption = {
  key: string;
  value: string;
};

export type Filter = {
  title: string;
  key: string;
  options: FilterOption[];
};

export type Filters = {
  [key in Builders]: Filter[];
};

export const filters: Filters = {
  CPU: [
    {
      title: 'Clock Speed',
      key: 'clockSpeed',
      options: [
        { value: '1.5 GHz - 1.99 GHz', key: '1.5-1.99-GHz' },
        { value: '2.0 GHz - 2.49 GHz', key: '2.0-2.49-GHz' },
        { value: '2.5 GHz - 2.99 GHz', key: '2.5-2.99-GHz' },
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
  'Graphic card': [],
  Motherboard: [],
  RAM: [],
  HDD: [],
};
