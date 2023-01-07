import React from 'react';
import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
