import React from 'react';
import { Container } from '@mui/system';
import Header from '../Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default Layout;
