import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Button, InputBase } from '@mui/material';
import { Box } from '@mui/system';
import AppLogo from '../Icons';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        padding="10px"
      >
        <AppLogo />
        <InputBase />
        <Box display="flex" gap="20px">
          <Button color="primary" variant="contained">
            Log In
          </Button>
          <Button color="secondary" variant="contained">
            Sign Up
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
