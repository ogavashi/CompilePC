import { CategoryName, SelectedFilter } from '../../types/index';

const QUERY_KEY_FACTORIES = {
  PRODUCTS: {
    all: () => ['products'],
    list: (category: CategoryName, filter: SelectedFilter) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), category, filter },
    ],
    get: (id: string, category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), id, category },
    ],
  },
};

export default QUERY_KEY_FACTORIES;
