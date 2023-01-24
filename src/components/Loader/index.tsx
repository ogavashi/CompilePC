import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '90vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress color="secondary" size="5rem" />
    </Box>
  );
};

export default Loader;
