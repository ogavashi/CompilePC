import React, { useCallback, useMemo } from 'react';
import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAssembly } from '../../store/builder/selectors';
import { isEmpty } from '../../utils/assembly';
import { ROUTES } from '../../common/constants';
import useStyles from './styles';
import useGetAssemblies from '../../hooks/useGetAssemblies';
import { selectUser } from '../../store/user/selectors';
import Loader from '../Loader';
import ErrorScreen from '../ErrorScreen';
import Assembly from './Assembly';
import useDeleteAssembly from '../../hooks/useDeleteAssembly';

const AssembliesScreen = () => {
  const styles = useStyles();

  const assembly = useSelector(selectAssembly);

  const user = useSelector(selectUser);

  const isAssemblyEmpty = useMemo(() => isEmpty(assembly), [assembly]);

  const { mutate, isLoading: isDeleting } = useDeleteAssembly();

  const handleDelete = useCallback(
    (assemblyId: string) => mutate({ assemblyId, userId: user?.id as string }),
    [mutate, user?.id],
  );
  const {
    data: assemblies,
    isLoading,
    isError,
  } = useGetAssemblies(user?.id as string);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <Box className={styles.wrapper}>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h2" gutterBottom>
            My assemblies
          </Typography>
          <Button
            sx={{ height: '2.25rem' }}
            variant="contained"
            color="secondary"
            component={Link}
            to={ROUTES.MAIN}
            size="small"
          >
            {isAssemblyEmpty ? 'Add assembly' : 'Keep editing assembly'}
          </Button>
        </Box>
        <Box>
          {assemblies.length ? (
            assemblies.map((userAssembly) => (
              <Assembly
                userAssembly={userAssembly}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
                key={userAssembly.id}
              />
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '70vh',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h2" textAlign="center">
                Nothing found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AssembliesScreen;
