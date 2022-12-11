import { CollectionName, Part } from '../../types';
import functions from '../common/firebaseFunctons';

type Filter = Record<string, string | string[]>;

const Products = {
  getByCategory: async (
    collectionName: CollectionName,
    filter: Filter,
  ): Promise<Part[]> => {
    const getProducts = functions.httpsCallable('getProducts');
    const { data: products }: { data: Part[] } = await getProducts({
      collectionName,
      filter,
    });
    return products;
  },
};

export default Products;
