import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TableRow from './TableRow';
import useStyles from './styles';
import { FullProduct, Store } from '../../../../../../types';
import SkeletonRow from './TableRow/SkeletonRow';

type StoresTableProps = {
  product: FullProduct | undefined;
  isError: boolean;
  isLoading: boolean;
};

const StoresTable: React.FC<StoresTableProps> = ({
  product,
  isError,
  isLoading,
}) => {
  const styles = useStyles();

  const Table = () => (
    <>
      {(isLoading ? Array.from(new Array(5)) : product?.stores || []).map(
        (store: Store, index) =>
          store && product ? (
            <TableRow key={store.id} store={store} product={product} />
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <SkeletonRow key={index} />
          ),
      )}
    </>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Where to buy
      </Typography>
      <Paper className={styles.paperWrapper}>
        <Box className={styles.boxWrapper}>
          {isError ? (
            <Typography variant="h5">Couldn&#39;t load stores</Typography>
          ) : (
            <Table />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default StoresTable;
