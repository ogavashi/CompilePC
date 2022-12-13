import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { Store } from '../../types/index';
import { UIContext } from '../components/Unknown/UIContext';
import QUERY_KEY_FACTORIES from '../common/queryKeyFactories';
import Stores from '../api/stores';

const useStores = (ids: string[]): UseQueryResult<Store[]> => {
  const { setAlert } = useContext(UIContext);

  return useQuery(
    QUERY_KEY_FACTORIES.STORES.byIDs(ids),
    () => Stores.getByIDs(ids),
    {
      onError: () =>
        setAlert({
          show: true,
          severity: 'error',
          message: `Could not fetch stores. Try again later.`,
        }),
    },
  );
};

export default useStores;
