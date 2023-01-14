import React, { useMemo } from 'react';
import { Box, Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../Header';
import { selectLoadingState } from '../../store/user/selectors';
import { LoadingState } from '../../common/constants';

const MainLayout = () => {
  const loadingState = useSelector(selectLoadingState);

  const isLoading = useMemo(
    () => loadingState === LoadingState.LOADING,
    [loadingState],
  );

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        {isLoading ? (
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
        ) : (
          <Outlet />
        )}
      </Container>
    </>
  );
};

export default MainLayout;
