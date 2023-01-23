import React, { useMemo, useCallback } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Paper } from '@mui/material';
import { Assembly, CategoryName } from '../../../../types';
import useStyles from './styles';
import { getAverageSum } from '../../../utils/assembly';
import AssemblyCardItem from './AssemblyCardItem';
import { setAssembly } from '../../../store/builder/slice';
import { ROUTES } from '../../../common/constants';

type AssemblyCardProps = {
  assembly: Assembly;
  handleShare: () => void;
};

const AssemblyCard: React.FC<AssemblyCardProps> = ({
  assembly,
  handleShare,
}) => {
  const styles = useStyles();

  const totalSum = useMemo(() => getAverageSum(assembly), [assembly]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    dispatch(setAssembly(assembly));
    navigate(ROUTES.MAIN);
  }, [assembly, dispatch, navigate]);

  return (
    <Box className={styles.mainWrapper}>
      <Paper>
        <Box className={styles.wrapper}>
          {Object.keys(assembly).map(
            (category) =>
              assembly[category as CategoryName] && (
                <AssemblyCardItem
                  category={category as CategoryName}
                  key={category}
                  part={assembly[category as CategoryName]}
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
            >
              Share
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              className={styles.button}
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssemblyCard;
