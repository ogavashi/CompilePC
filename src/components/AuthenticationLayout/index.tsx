import React, { useEffect } from 'react';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthIcon, BigLogo } from '../Icons';
import useStyles from './styles';
import { selectUser } from '../../store/user/selectors';
import { ROUTES } from '../../common/constants';

const AuthenticationLayout = () => {
  const styles = useStyles();

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.MAIN);
    }
  }, [navigate, user]);

  return (
    <Box display="flex" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        className={styles.leftWrapper}
      >
        <BigLogo />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <AuthIcon />
          <Typography variant="h1" className={styles.title}>
            Just simply compile your future PC
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        className={styles.rightWrapper}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthenticationLayout;
