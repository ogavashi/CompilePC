import { CategoryName } from '../../types/index';

const QUERY_KEY_FACTORIES = {
  PRODUCTS: {
    all: () => ['products'],
    list: (category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), category },
    ],
    get: (id: string, category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.list(category), id },
    ],
  },
};

export default QUERY_KEY_FACTORIES;
