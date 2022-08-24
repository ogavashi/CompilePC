import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import { AppLogo } from '../Icons';
import Search from '../Search';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingY={2}
        >
          <AppLogo />
          <Search />
          <Box display="flex" gap={4}>
            <Button color="primary" variant="contained">
              Log In
            </Button>
            <Button color="secondary" variant="contained">
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
