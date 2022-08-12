import { Box, Typography } from '@mui/material';
import React from 'react';

const NotFoundScreen: React.FC = () => (
  <Box
    height="calc(100vh - 64px)"
    width="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Typography variant="h1">Page not found</Typography>
  </Box>
);

export default NotFoundScreen;
