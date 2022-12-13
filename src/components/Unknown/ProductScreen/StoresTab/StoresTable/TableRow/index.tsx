import React, { useMemo } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { FullProduct, Store } from '../../../../../../../types';

type TableRowProps = {
  product: FullProduct;
  store: Store;
};

const TableRow: React.FC<TableRowProps> = ({ product, store }) => {
  const styles = useStyles();

  const shop = useMemo(
    () => product.price.offers.find((offer) => offer.storeId === store.id),
    [product.price.offers, store.id],
  );

  return (
    <Paper className={styles.tableRow}>
      <img
        className={styles.image}
        src={product.mainImage}
        alt={product.name}
      />
      <Typography variant="h5">{product.name}</Typography>
      <Divider
        className={styles.divider}
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Typography variant="h5">{store.name}</Typography>
      <Box className={styles.buyBlock}>
        <Typography variant="h4" className={styles.price}>
          {shop?.price} ₴
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to={shop?.link as string}
          fullWidth
        >
          Buy in shop
        </Button>
      </Box>
    </Paper>
  );
};

export default TableRow;
