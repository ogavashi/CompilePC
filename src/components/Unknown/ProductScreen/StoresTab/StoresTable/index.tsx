import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TableRow from './TableRow';
import useStyles from './styles';

const StoresTable = () => {
  const styles = useStyles();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Where to buy
      </Typography>
      <Paper className={styles.paperWrapper}>
        <Box className={styles.boxWrapper}>
          {Array.from(new Array(5)).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default StoresTable;
