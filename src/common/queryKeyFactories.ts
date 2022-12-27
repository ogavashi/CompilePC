import { CategoryName, QueryFilter } from '../../types/index';

const QUERY_KEY_FACTORIES = {
  PRODUCTS: {
    all: () => ['products'],
    list: (category: CategoryName, filter: QueryFilter) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), category, filter },
    ],
    get: (id: string, category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), id, category },
    ],
  },
};

export default QUERY_KEY_FACTORIES;
