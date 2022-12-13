import { CategoryName } from '../../types/index';

const QUERY_KEY_FACTORIES = {
  PRODUCTS: {
    all: () => ['products'],
    list: (category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), category },
    ],
    get: (id: string, category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), id, category },
    ],
  },
};

export default QUERY_KEY_FACTORIES;
