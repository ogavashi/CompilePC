import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Part, QueryFilter, Builder } from '../../types/index';
import useQueryParams from './useQueryParams';
import { UIContext } from '../components/UIContext';
import Products from '../api/products';
import QUERY_KEY_FACTORIES from '../common/queryKeyFactories';
import { selectOpenedBuilder } from '../store/builder/selectors';

const useProducts = (builder: Builder): UseQueryResult<Part[]> => {
  const { parseCurrentParams } = useQueryParams();
  const { setAlert } = useContext(UIContext);

  const openedBuilder = useSelector(selectOpenedBuilder);

  const { categoryName, collectionName } = builder;

  const isEnabled = openedBuilder === categoryName;

  const filter: QueryFilter = parseCurrentParams();

  return useQuery(
    QUERY_KEY_FACTORIES.PRODUCTS.list(categoryName, filter),
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
