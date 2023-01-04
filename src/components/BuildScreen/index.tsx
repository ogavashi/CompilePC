import React from 'react';
import { Box } from '@mui/system';
import useStyles from './styles';
import Filter from './Filter';
import Assembly from './Assembly';
import BuildersList from './BuildersList';

const BuildScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <Box className={styles.mainContainer}>
      <Filter />
      <BuildersList />
      <Assembly />
    </Box>
  );
};

export default BuildScreen;
