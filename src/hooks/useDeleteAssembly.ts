import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { UIContext } from '../components/UIContext';
import QUERY_KEY_FACTORIES from '../common/queryKeyFactories';
import Assemblies from '../api/assemblies';
import { ROUTES } from '../common/constants';

const useDeleteAssembly = () => {
  const queryClient = useQueryClient();

  const location = useLocation();

  const navigate = useNavigate();

  const { setAlert } = useContext(UIContext);

  const shouldNavigate = !!matchPath(ROUTES.ASSEMBLY, location.pathname);

  return useMutation(
    ({ assemblyId, userId }: { assemblyId: string; userId: string }) => {
      return Assemblies.delete(assemblyId, userId);
    },
    {
      onError: () =>
        setAlert({
          show: true,
          severity: 'error',
          message: `Could not delete assembly. Try again later.`,
        }),
      onSuccess: (_, variables) => {
        setAlert({
          show: true,
          severity: 'success',
          message: `Successfully deleted assembly.`,
        });
        if (shouldNavigate) {
          navigate(ROUTES.MAIN);
          return;
        }
        queryClient.invalidateQueries({
          queryKey: QUERY_KEY_FACTORIES.ASSEMBLIES.list(variables.userId),
        });
      },
    },
  );
};

export default useDeleteAssembly;
