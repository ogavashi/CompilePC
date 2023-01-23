import { FunctionComponent, SVGProps } from 'react';
import {
  CaseIcon,
  CoolingIcon,
  CPUIcon,
  GPUIcon,
  HDDIcon,
  MotherboardIcon,
  PSUIcon,
  RAMIcon,
  SSDIcon,
} from '../components/Icons';

const DEFAULT_REGION = 'europe-central2';

const IconByCategory: {
  [key in keyof typeof ProductCategories]: FunctionComponent<
    SVGProps<SVGSVGElement>
  >;
} = {
  CPU: CPUIcon,
  GPU: GPUIcon,
  RAM: RAMIcon,
  SSD: SSDIcon,
  HDD: HDDIcon,
  cooling: CoolingIcon,
  case: CaseIcon,
  motherboard: MotherboardIcon,
  PSU: PSUIcon,
};

const ProductCategories = {
  CPU: {
    categoryName: 'CPU',
    builderTitle: 'CPU',
    collectionName: 'CPUs',
  },
  GPU: {
    categoryName: 'GPU',
    builderTitle: 'Graphic card',
    collectionName: 'graphicsCards',
  },
  PSU: {
    categoryName: 'PSU',
    builderTitle: 'Power suply unit',
    collectionName: 'PSUs',
  },
  RAM: {
    categoryName: 'RAM',
    builderTitle: 'RAM',
    collectionName: 'RAM',
  },
  case: {
    categoryName: 'case',
    builderTitle: 'Case',
    collectionName: 'cases',
  },
  cooling: {
    categoryName: 'cooling',
    builderTitle: 'Cooling',
    collectionName: 'coolings',
  },
  motherboard: {
    categoryName: 'motherboard',
    builderTitle: 'Motherboard',
    collectionName: 'motherboards',
  },
  SSD: {
    categoryName: 'SSD',
    builderTitle: 'SSD',
    collectionName: 'SSD',
  },
  HDD: {
    categoryName: 'HDD',
    builderTitle: 'HDD',
    collectionName: 'HDD',
  },
} as const;

const ProductPageTabs = [
  { value: '', label: 'Overview' },
  { value: 'stores', label: 'Stores' },
  { value: 'reviews', label: 'Reviews' },
];

const ROUTES = {
  MAIN: '/',
  PRODUCT: '/product/:category/:id/*',
  ASSEMBLY: '/assembly/:id',
  ASSEMBLIES: '/assemblies',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  NOT_FOUND: '/*',
};

enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  IDLE = 'IDLE',
}

enum BuilderMode {
  NEW = 'NEW',
  EDIT = 'EDIT',
}

const NUMERIC_FORMAT = /^[0-9]*$/;

const MIN_PRICE_SLIDER_DISTANCE = 1000;
// eslint-disable-next-line import/prefer-default-export
export {
  DEFAULT_REGION,
  IconByCategory,
  ProductCategories,
  ProductPageTabs,
  LoadingState,
  BuilderMode,
  MIN_PRICE_SLIDER_DISTANCE,
  NUMERIC_FORMAT,
  ROUTES,
};
