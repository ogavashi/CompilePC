import React, { useMemo } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import { CategoryName } from '../../../../types';
import useStyles from './styles';
import { selectAssembly } from '../../../store/builder/selectors';
import { eraseAssembly } from '../../../store/builder/slice';
import { getAverageSum, isEmpty } from '../../../utils/assembly';
import AssemblyPart from '../../BuildScreen/Assembly/AssemblyPart';
import AssemblyCardItem from './AssemblyCardItem';

const AssemblyCard = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const assembly = useSelector(selectAssembly);

  const totalSum = useMemo(() => getAverageSum(assembly), [assembly]);

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
            >
              Share
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssemblyCard;
