import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { AppLogo } from '../Icons';
import selectUser from '../../store/user/selectors';

const Header: React.FC = () => {
  const user = useSelector(selectUser);

  const auth = useAuth();

  const handleLogOut = useCallback(async () => {
    await auth.signOut();
  }, [auth]);

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
          <Box display="flex" gap={4} alignItems="center">
            {user ? (
              <>
                <Typography>{user.username}</Typography>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
