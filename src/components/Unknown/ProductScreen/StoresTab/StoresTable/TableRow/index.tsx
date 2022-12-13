import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import useStyles from './styles';

const TableRow = () => {
  const styles = useStyles();

  return (
    <Paper className={styles.tableRow}>
      <img
        src="https://content1.rozetka.com.ua/goods/images/big/292785228.png"
        alt="biba"
      />
      <Typography variant="h5">
        MSI GeForce GTX1660 SUPER 6GB GDDR6 VENTUS XS OC
      </Typography>
      <Divider
        className={styles.divider}
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Typography variant="h5">FOXTROT.UA</Typography>
      <Box className={styles.buyBlock}>
        <Typography variant="h4" className={styles.price}>
          14 556 ₴
        </Typography>
        <Button color="secondary" variant="contained" fullWidth>
          Buy in shop
        </Button>
      </Box>
    </Paper>
  );
};

export default TableRow;
