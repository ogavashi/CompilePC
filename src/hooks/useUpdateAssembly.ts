import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SaveAssemblyDto, User } from '../../types/index';
import { UIContext } from '../components/UIContext';
import Assemblies from '../api/assemblies';
import { BuilderMode, ROUTES } from '../common/constants';
import { eraseAssembly, setMode } from '../store/builder/slice';

const useUpdateAssembly = (mode: BuilderMode, assemblyId: string | null) => {
  const { setAlert } = useContext(UIContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return useMutation(
    ({
      title,
      userData,
      userAssembly,
    }: {
      title: string;
      userData: User;
      userAssembly: SaveAssemblyDto;
    }) => {
      if (mode === BuilderMode.EDIT && assemblyId) {
        return Assemblies.update(assemblyId, title, userData, userAssembly);
      }
      return Assemblies.save(title, userData, userAssembly);
    },
    {
      onError: () =>
        setAlert({
          show: true,
          severity: 'error',
          message: `Could not save assembly. Try again later.`,
        }),
      onSuccess: (data) => {
        setAlert({
          show: true,
          severity: 'success',
          message: `Successfully saved assembly.`,
        });
        navigate(generatePath(ROUTES.ASSEMBLY, { id: data }));
        dispatch(
          setMode({
            builderMode: BuilderMode.NEW,
            id: null,
            assemblyTitle: null,
          }),
        );
        dispatch(eraseAssembly());
      },
    },
  );
};

export default useUpdateAssembly;
