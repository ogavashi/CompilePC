import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserAssembly } from '../../types/index';
import { UIContext } from '../components/UIContext';
import QUERY_KEY_FACTORIES from '../common/queryKeyFactories';
import Assemblies from '../api/assemblies';

const useGetAssemblies = (userId: string): UseQueryResult<UserAssembly[]> => {
  const { setAlert } = useContext(UIContext);

  return useQuery(
    QUERY_KEY_FACTORIES.ASSEMBLIES.list(userId),
    () => Assemblies.list(userId),
    {
      onError: () =>
        setAlert({
          show: true,
          severity: 'error',
          message: `Could not fetch assemblies. Try again later.`,
        }),
    },
  );
};

export default useGetAssemblies;
