import React from 'react';
import { Box } from '@mui/system';
import { Typography, Paper } from '@mui/material';
import useStyles from './styles';

import Filter from './Filter';
import { BuildScreenContextProvider } from '../BuildScreenContext';
import { ProductCategories } from '../../../common/constants';
import { CategoryName } from '../../../../types';
import Builder from './Builder';

const BuildScreen: React.FC = () => {
  const styles = useStyles();

  const MainBuilder = () => (
    <>
      {Object.keys(ProductCategories).map((category) => (
        <Builder
          category={ProductCategories[category as CategoryName]}
          key={category}
        />
      ))}
    </>
  );

  return (
    <BuildScreenContextProvider>
      <Box
        display="flex"
        justifyContent="center"
        className={styles.mainContainer}
      >
        <Box className={styles.sideSection}>
          <Typography gutterBottom variant="h2">
            Filters
          </Typography>
          <Paper>
            <Filter />
          </Paper>
        </Box>
        <Box
          className={styles.mainSection}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Box>
            <Typography gutterBottom variant="h2">
              Main Parts
            </Typography>
            <MainBuilder />
          </Box>
          <Box>
            <Typography gutterBottom variant="h2">
              Periphery
            </Typography>
            <Paper>biba</Paper>
          </Box>
        </Box>
        <Box className={styles.sideSection}>
          <Typography gutterBottom variant="h2">
            Your Build
          </Typography>
          <Paper>bibabibabibabiba</Paper>
        </Box>
      </Box>
    </BuildScreenContextProvider>
  );
};

export default BuildScreen;
