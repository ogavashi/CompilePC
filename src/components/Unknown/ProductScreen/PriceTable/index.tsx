import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';
import TableElement from './TableElement';
import { Price, Store } from '../../../../../types';

type PriceTableProps = {
  price: Price;
  stores: Store[];
};

const PriceTable: React.FC<PriceTableProps> = ({ price, stores }) => {
  const styles = useStyles();

  const columns = price.offers.length > 8 ? 3 : 2;

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
          columns={{ xs: 1, sm: 2, md: columns }}
        >
          {price.offers.map((offer) => (
            <TableElement
              offer={offer}
              store={
                (stores &&
                  stores.find((store) => store.id === offer.storeId)) ||
                null
              }
              key={offer.storeId}
            />
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default PriceTable;
