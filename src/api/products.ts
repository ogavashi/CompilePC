import { CollectionName, FullProduct, Part } from '../../types';
import functions from '../common/firebaseFunctons';

type Filter = Record<string, string | string[]>;

const Products = {
  get: async (
    id: string,
    collectionName: CollectionName,
  ): Promise<FullProduct> => {
    const getProduct = functions.httpsCallable('getProduct');
    const { data: product }: { data: FullProduct } = await getProduct({
      id,
      collectionName,
    });
    return product;
  },
  list: async (
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
