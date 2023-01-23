import {
  Assembly,
  CategoryName,
  SelectedFilter,
  User,
} from '../../types/index';

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
  ASSEMBLIES: {
    all: () => ['assemblies'],
    list: (userId: string) => [
      { ...QUERY_KEY_FACTORIES.ASSEMBLIES.all(), userId },
    ],
    get: (id: string) => [{ ...QUERY_KEY_FACTORIES.ASSEMBLIES.all(), id }],
    save: (user: User, assembly: Assembly) => [
      { ...QUERY_KEY_FACTORIES.PRODUCTS.all(), user, assembly },
    ],
  },
};

export default QUERY_KEY_FACTORIES;
