import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { BuildScreenContext } from '../components/Unknown/BuildScreenContext/index';
import { Part, ProductCategory } from '../../types/index';
import useQueryParams from './useQueryParams';
import { UIContext } from '../components/Unknown/UIContext';
import fetchProducts from '../api/products';

const useProducts = (category: ProductCategory): UseQueryResult<Part[]> => {
  const { parseCurrentParams } = useQueryParams();
  const { selectedBuilder } = useContext(BuildScreenContext);
  const { setAlert } = useContext(UIContext);

  const isEnabled = selectedBuilder?.categoryName === category.categoryName;

  const filter = parseCurrentParams();

  return useQuery(
    [category.categoryName],
    () => fetchProducts(category.collectionName, filter),
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
