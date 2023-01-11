import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { AppLogo } from '../Icons';

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
          <Link to="/">
            <AppLogo />
          </Link>
          <Box display="flex" gap={4}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/login"
            >
              Log In
            </Button>
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              to="/register"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
