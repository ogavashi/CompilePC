import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { Part, ProductCategory } from '../../types/index';
import { UIContext } from '../components/Unknown/UIContext';
import QUERY_KEY_FACTORIES from '../common/queryKeyFactories';
import Product from '../api/product';

const useProduct = (
  id: string,
  category: ProductCategory,
): UseQueryResult<Part[]> => {
  const { setAlert } = useContext(UIContext);

  const { categoryName, collectionName } = category;

  return useQuery(
    QUERY_KEY_FACTORIES.PRODUCT.byID(id, categoryName),
    () => Product.getByID(id, collectionName),
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
