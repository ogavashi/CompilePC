import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { BuildScreenContext } from '../components/BuildScreenContext/index';
import { Part, ProductCategory } from '../../types/index';
import useQueryParams from './useQueryParams';
import { UIContext } from '../components/UIContext';
import Products from '../api/products';
import QUERY_KEY_FACTORIES from '../common/queryKeyFactories';

const useProducts = (category: ProductCategory): UseQueryResult<Part[]> => {
  const { parseCurrentParams } = useQueryParams();
  const { selectedBuilder } = useContext(BuildScreenContext);
  const { setAlert } = useContext(UIContext);

  const { categoryName, collectionName } = category;

  const isEnabled = selectedBuilder?.categoryName === categoryName;

  const filter = parseCurrentParams();

  return useQuery(
    QUERY_KEY_FACTORIES.PRODUCTS.list(categoryName),
    () => Products.list(collectionName, filter),
    {
      enabled: isEnabled,
      onError: () =>
        setAlert({
          show: true,
          severity: 'error',
          message: `Could not fetch products. Try again later.`,
        }),
    },
  );
};

export default useProducts;
