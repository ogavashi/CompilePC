import { CategoryName } from '../../types/index';

const QUERY_KEY_FACTORIES = {
  PRODUCTS: {
    all: () => ['products'],
    byCategory: (category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), category },
    ],
  },
  PRODUCT: {
    base: () => ['product'],
    byID: (id: string, category: CategoryName) => [
      { ...QUERY_KEY_FACTORIES.PRODUCT.base(), id, category },
    ],
  },
  STORES: {
    all: () => ['stores'],
    byIDs: (ids: string[]) => [{ ...QUERY_KEY_FACTORIES.STORES.all(), ...ids }],
  },
};

export default QUERY_KEY_FACTORIES;
