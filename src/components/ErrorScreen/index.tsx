import React from 'react';
import { Box, Typography } from '@mui/material';
import { ErrorLoading } from '../Icons';
import useStyles from './styles';

const ErrorScreen = () => {
  const styles = useStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '90vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorLoading className={styles.image} />
      <Typography variant="h2">Couldn&#39;t load assembly</Typography>
    </Box>
  );
};

export default ErrorScreen;
