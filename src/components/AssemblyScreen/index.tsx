import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AssemblyCard from './AssemblyCard';

const AssemblyScreen = () => {
  return (
    <Box marginTop="2rem" marginBottom="2rem">
      <Typography variant="h2" gutterBottom>
        Assembly name
      </Typography>
      <Box display="flex">
        <Box style={{ width: '50%' }}>
          <div>Boba</div>
        </Box>
        <AssemblyCard />
      </Box>
    </Box>
  );
};

export default AssemblyScreen;
