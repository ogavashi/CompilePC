import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';
import TableElement from './TableElement';
import { Price } from '../../../../../types';

type PriceTableProps = {
  price: Price;
};

const PriceTable: React.FC<PriceTableProps> = ({ price }) => {
  const styles = useStyles();

  return (
    <Paper>
      <Box className={styles.tableWrapper}>
        <Box className={styles.topRow} gap={4}>
          <Typography variant="h4" gutterBottom>
            {price.range.minPrice.toLocaleString()} ₴ -
            {price.range.maxPrice.toLocaleString()} ₴
          </Typography>
        </Box>
        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2, md: 2 }}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          columns={{ xs: 1, sm: 2, md: price.offers.length > 8 ? 3 : 2 }}
        >
          {price.offers.map((offer) => (
            <TableElement offer={offer} key={offer.storeId} />
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default PriceTable;
