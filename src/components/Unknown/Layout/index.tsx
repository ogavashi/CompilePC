import React from 'react';
import { Container } from '@mui/system';
import Header from '../Header';

const BuildPage: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};

export default BuildPage;
