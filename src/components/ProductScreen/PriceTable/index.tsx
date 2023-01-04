import clsx from 'clsx';
import { Grid, Paper, Typography, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import TableElement from './TableElement';
import { CategoryName, Part, Store } from '../../../../types';
import { selectAssemblyPart } from '../../../store/builder/selectors';
import {
  addAssemblyPart,
  removeAssemblyPart,
} from '../../../store/builder/slice';

type PriceTableProps = {
  product: Part | undefined;
  stores: Store[] | undefined;
  category: CategoryName;
  isError: boolean;
  isLoading: boolean;
};

const PriceTable: React.FC<PriceTableProps> = ({
  product,
  stores,
  isError,
  isLoading,
  category,
}) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const selectedPart = useSelector(selectAssemblyPart(category));

  const columns = product?.price.offers.length || 15 > 8 ? 3 : 2;

  const offers = product?.price.offers || [];

  const tableTitle = isError ? "Couldn't load stores" : 'No stores available';

  const isOverflowed = useMemo(
    () => (product?.price.offers.length || 0) > 30,
    [product?.price.offers.length],
  );

  const AddButton = () => {
    if (isLoading || !product) {
      return null;
    }
    if (selectedPart && selectedPart.id === product?.id) {
      return (
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch(removeAssemblyPart(category))}
        >
          Remove from assembly
        </Button>
      );
    }
    if (selectedPart && product) {
      return (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(addAssemblyPart({ part: product, category }))}
        >
          Replace in assembly
        </Button>
      );
    }
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          dispatch(addAssemblyPart({ part: product as Part, category }))
        }
      >
        Add to assembly
      </Button>
    );
  };

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
              <Typography variant="h4">
                {isLoading ? (
                  <Skeleton variant="text" animation="wave" width={400} />
                ) : (
                  `${product?.price.range.minPrice.toLocaleString()} ₴ -
                ${product?.price.range.maxPrice.toLocaleString()} ₴`
                )}
              </Typography>
              <AddButton />
            </Box>

            <Box
              className={clsx(styles.pricesList, {
                [styles.overflow]: isOverflowed,
              })}
            >
              <Grid
                container
                rowSpacing={{ xs: 1, sm: 2, md: 2 }}
                columnSpacing={{ xs: 1, sm: 2, md: 5 }}
                columns={{ xs: 1, sm: 2, md: columns }}
              >
                {(isLoading ? Array.from(new Array(30)) : offers).map(
                  (offer, index) =>
                    offer ? (
                      <TableElement
                        offer={offer}
                        store={
                          (stores &&
                            stores.find(
                              (store) => store.id === offer.storeId,
                            )) ||
                          null
                        }
                        key={offer.storeId + offer.price}
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
                          width={265}
                          height={25}
                        />
                      </Grid>
                    ),
                )}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PriceTable;
