import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { useFirebaseApp } from 'reactfire';
import { BuildScreenContext } from '../components/Unknown/BuildScreenContext/index';
import { Part, ProductCategory } from '../../types/index';
import useQueryParams from '../hooks/useQueryParams';
import { DEFAULT_REGION } from '../common/constants';
import { UIContext } from '../components/Unknown/UIContext';

const useProducts = (category: ProductCategory): UseQueryResult<Part[]> => {
  const functions = useFirebaseApp().functions(DEFAULT_REGION);
  const getProducts = functions.httpsCallable('getProducts');

  const { parseCurrentParams } = useQueryParams();
  const { selectedBuilder } = useContext(BuildScreenContext);
  const { setAlert } = useContext(UIContext);

  const isEnabled = selectedBuilder?.categoryName === category.categoryName;

  const fetchProducts = async (): Promise<Part[]> => {
    const filter = parseCurrentParams();
    const { data: products }: { data: Part[] } = await getProducts({
      collectionName: category.collectionName,
      filter,
    });
    return products;
  };

  return useQuery([category.categoryName], fetchProducts, {
    enabled: isEnabled,
    onError: () =>
      setAlert({
        show: true,
        severity: 'error',
        message: `Could not fetch products. Try again later.`,
      }),
  });
};

export default useProducts;
