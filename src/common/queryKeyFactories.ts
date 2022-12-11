import { CategoryName } from '../../types/index';

const QUERY_KEY_FACTORIES = {
  PRODUCTS: {
    all: () => ['products'],
    byCategory: (category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), category },
    ],
  },
};

export default QUERY_KEY_FACTORIES;
