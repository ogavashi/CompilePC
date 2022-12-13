import { CollectionName, Part } from '../../types';
import functions from '../common/firebaseFunctons';

const Product = {
  getByID: async (
    id: string,
    collectionName: CollectionName,
  ): Promise<Part> => {
    const getProduct = functions.httpsCallable('getProduct');
    const { data: product }: { data: Part } = await getProduct({
      id,
      collectionName,
    });
    return product;
  },
};

export default Product;
