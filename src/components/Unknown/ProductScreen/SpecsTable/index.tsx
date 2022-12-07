import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { SpecBlock } from '../../../../../types';
import SkeletonBlock from './SkeletonBlock';
import useStyles from './styles';
import TableBlock from './TableBlock';

type SpecsTableProps = {
  specs: SpecBlock[] | null;
  isLoading: boolean;
  isError: boolean;
};

const SpecsTable: React.FC<SpecsTableProps> = ({
  specs,
  isLoading,
  isError,
}) => {
  const styles = useStyles();

  const Table = () =>
    isLoading ? (
      <SkeletonBlock />
    ) : (
      <>
        {(specs || []).map((specBlock) => (
          <TableBlock specBlock={specBlock} key={specBlock.name} />
        ))}
      </>
    );
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Specs
      </Typography>
      <Paper className={styles.paperWrapper}>
        <Box className={styles.boxWrapper}>
          {isError ? (
            <Typography variant="h2">Couldn&#39;t load specs</Typography>
          ) : (
            <Table />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SpecsTable;
