import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './style';

const CircularLoader = () => {
  const styles = useStyles();

  return (
    <Box className={styles.mainContainer}>
      <CircularProgress size={60} className={styles.loader} />
    </Box>
  );
};

export default CircularLoader;
