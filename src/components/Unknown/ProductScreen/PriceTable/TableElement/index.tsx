import { Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Offer } from '../../../../../../types';
import useStyles from './styles';

type TableElementProps = {
  offer: Offer;
};

const TableElement: React.FC<TableElementProps> = ({ offer }) => {
  const styles = useStyles();

  return (
    <Grid item xs={2} sm={2} md={1}>
      <Box display="flex" justifyContent="space-between" maxWidth={250}>
        <Link href={offer.link} target="blank" underline="none">
          <Typography className={styles.store}>Rozetka →</Typography>
        </Link>
        <Link href={offer.link} target="blank" underline="none">
          <Typography className={styles.price}>
            {offer.price.toLocaleString()}₴
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
};

export default TableElement;
