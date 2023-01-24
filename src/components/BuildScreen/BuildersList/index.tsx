import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { selectBuilders } from '../../../store/builder/selectors';
import BuilderModule from './BuilderModule';
import useStyles from './styles';

const BuildersList = () => {
  const styles = useStyles();

  const builders = useSelector(selectBuilders);

  const MainBuilder = () => (
    <>
      {builders.map((builder) => (
        <BuilderModule builder={builder} key={builder.builderTitle} />
      ))}
    </>
  );

  return (
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
    </Box>
  );
};

export default BuildersList;
