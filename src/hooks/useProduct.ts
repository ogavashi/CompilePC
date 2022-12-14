import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { FullProduct, ProductCategory } from '../../types/index';
import { UIContext } from '../components/Unknown/UIContext';
import QUERY_KEY_FACTORIES from '../common/queryKeyFactories';
import Products from '../api/products';

const useProduct = (
  id: string,
  category: ProductCategory,
): UseQueryResult<FullProduct> => {
  const { setAlert } = useContext(UIContext);

  const { categoryName, collectionName } = category;

  return useQuery(
    QUERY_KEY_FACTORIES.PRODUCTS.get(id, categoryName),
    () => Products.get(id, collectionName),
    {
      onError: () =>
        setAlert({
          show: true,
          severity: 'error',
          message: `Could not fetch ${categoryName}. Try again later.`,
        }),
    },
  );
};

export default useProduct;
