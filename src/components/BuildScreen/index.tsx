import React from 'react';
import { Box } from '@mui/system';
import { Typography, Paper } from '@mui/material';
import useStyles from './styles';
import Filter from './Filter';
import { ProductCategories } from '../../common/constants';
import { CategoryName } from '../../../types';
import Builder from './Builder';
import Build from './Build';

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
        <Paper>
          <Build />
        </Paper>
      </Box>
    </Box>
  );
};

export default BuildScreen;
