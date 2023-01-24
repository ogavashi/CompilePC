import React from 'react';
import { Paper, Typography, Skeleton } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import useStyles from './styles';

const SkeletonRow = () => {
  const styles = useStyles();

  return (
    <Paper className={styles.tableRow}>
      <Skeleton
        className={styles.image}
        variant="rounded"
        width={150}
        height={140}
        animation="wave"
      />
      <Typography variant="h5">
        <Skeleton variant="text" animation="wave" width={500} height={100} />
      </Typography>
      <Divider
        className={styles.divider}
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Typography variant="h5">
        <Skeleton variant="text" animation="wave" width={250} height={100} />
      </Typography>
      <Box className={styles.buyBlock}>
        <Skeleton
          className={styles.price}
          variant="rounded"
          animation="wave"
          width={160}
          height={50}
        />
        <Skeleton variant="rounded" animation="wave" width={160} height={40} />
      </Box>
    </Paper>
  );
};

export default SkeletonRow;
