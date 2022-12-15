import clsx from 'clsx';
import { Grid, Paper, Typography, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';
import TableElement from './TableElement';
import { Part, Store } from '../../../../types';

type PriceTableProps = {
  product: Part | undefined;
  stores: Store[] | undefined;
  isError: boolean;
  isLoading: boolean;
};

const PriceTable: React.FC<PriceTableProps> = ({
  product,
  stores,
  isError,
  isLoading,
}) => {
  const styles = useStyles();

  const columns = product?.price.offers.length || 15 > 8 ? 3 : 2;

  const offers = product?.price.offers || [];

  const tableTitle = isError ? "Couldn't load stores" : 'No stores available';

  return (
    <Paper>
      <Box
        className={clsx({
          [styles.empty]: isError || (!isLoading && !stores),
          [styles.tableWrapper]: isLoading || stores,
        })}
      >
        {!stores && !isLoading ? (
          <Typography variant="h2">{tableTitle}</Typography>
        ) : (
          <>
            <Box className={styles.topRow} gap={4}>
              <Typography variant="h4" gutterBottom>
                {isLoading ? (
                  <Skeleton variant="text" animation="wave" width={400} />
                ) : (
                  `${product?.price.range.minPrice.toLocaleString()} ₴ -
                ${product?.price.range.maxPrice.toLocaleString()} ₴`
                )}
              </Typography>
            </Box>
            <Grid
              container
              rowSpacing={{ xs: 1, sm: 2, md: 2 }}
              columnSpacing={{ xs: 1, sm: 2, md: 5 }}
              columns={{ xs: 1, sm: 2, md: columns }}
            >
              {(isLoading ? Array.from(new Array(15)) : offers).map(
                (offer, index) =>
                  offer ? (
                    <TableElement
                      offer={offer}
                      store={
                        (stores &&
                          stores.find((store) => store.id === offer.storeId)) ||
                        null
                      }
                      key={offer.storeId}
                    />
                  ) : (
                    <Grid
                      item
                      xs={2}
                      sm={2}
                      md={1} // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={270}
                        height={60}
                      />
                    </Grid>
                  ),
              )}
            </Grid>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PriceTable;
