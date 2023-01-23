import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { Assembly, User, UserAssembly } from '../../types/index';
import { UIContext } from '../components/UIContext';
import QUERY_KEY_FACTORIES from '../common/queryKeyFactories';
import Assemblies from '../api/assemblies';

const useSaveAssembly = (
  user: User,
  assembly: Assembly,
): UseQueryResult<string> => {
  const { setAlert } = useContext(UIContext);

  return useQuery(
    QUERY_KEY_FACTORIES.ASSEMBLIES.save(user, assembly),
    () => Assemblies.save(user, assembly),
    {
      onError: () =>
        setAlert({
          show: true,
          severity: 'error',
          message: `Could not save assembly. Try again later.`,
        }),
    },
  );
};

export default useSaveAssembly;
