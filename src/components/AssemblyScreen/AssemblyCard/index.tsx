import React, { useMemo, useCallback, useContext } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { CategoryName, UserAssembly } from '../../../../types';
import useStyles from './styles';
import { getAverageSum } from '../../../utils/assembly';
import AssemblyCardItem from './AssemblyCardItem';
import { setAssembly, setMode } from '../../../store/builder/slice';
import { BuilderMode, ROUTES } from '../../../common/constants';
import { selectUser } from '../../../store/user/selectors';
import Assemblies from '../../../api/assemblies';
import { UIContext } from '../../UIContext';

type AssemblyCardProps = {
  userAssembly: UserAssembly;
  handleShare: () => void;
};

const AssemblyCard: React.FC<AssemblyCardProps> = ({
  userAssembly,
  handleShare,
}) => {
  const styles = useStyles();

  const totalSum = useMemo(
    () => getAverageSum(userAssembly.assembly),
    [userAssembly.assembly],
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const { setAlert } = useContext(UIContext);

  const { mutate, isLoading } = useMutation(
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
      onSuccess: () => {
        setAlert({
          show: true,
          severity: 'success',
          message: `Successfully deleted assembly.`,
        });
        navigate(ROUTES.MAIN);
      },
    },
  );

  const handleEdit = useCallback(() => {
    dispatch(setAssembly(userAssembly.assembly));
    dispatch(
      setMode({
        builderMode: BuilderMode.EDIT,
        id: userAssembly.id,
        assemblyTitle: userAssembly.title,
      }),
    );
    navigate(ROUTES.MAIN);
  }, [
    dispatch,
    userAssembly.assembly,
    userAssembly.id,
    userAssembly.title,
    navigate,
  ]);

  const handleCopy = useCallback(() => {
    dispatch(setAssembly(userAssembly.assembly));
    dispatch(
      setMode({ builderMode: BuilderMode.NEW, id: null, assemblyTitle: null }),
    );
    navigate(ROUTES.MAIN);
  }, [dispatch, navigate, userAssembly.assembly]);

  const handleDelete = useCallback(() => {
    mutate({ assemblyId: userAssembly.id, userId: userAssembly.userId });
  }, [mutate, userAssembly.id, userAssembly.userId]);

  const madeByUser = useMemo(
    () => user?.id === userAssembly.userId,
    [user?.id, userAssembly.userId],
  );

  return (
    <Box className={styles.mainWrapper}>
      <Paper>
        <Box className={styles.wrapper}>
          {Object.keys(userAssembly.assembly).map(
            (category) =>
              userAssembly.assembly[category as CategoryName] && (
                <AssemblyCardItem
                  category={category as CategoryName}
                  key={category}
                  part={userAssembly.assembly[category as CategoryName]}
                />
              ),
          )}
          <Box className={styles.totalWrapper}>
            <Typography className={styles.totalTitle}>Total:</Typography>
            <Typography className={styles.totalSum}>{totalSum} ₴</Typography>
          </Box>
          <Divider
            className={styles.divider}
            orientation="horizontal"
            variant="middle"
          />
          <Box display="flex" flexDirection="row">
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              className={styles.button}
              onClick={handleShare}
              disabled={isLoading}
            >
              Share
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              className={styles.button}
              disabled={isLoading}
              onClick={() => (madeByUser ? handleEdit() : handleCopy())}
            >
              {madeByUser ? 'Edit' : 'Copy'}
            </Button>
            {madeByUser && (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                disabled={isLoading}
                className={styles.button}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssemblyCard;
