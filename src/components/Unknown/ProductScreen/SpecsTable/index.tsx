import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { SpecBlock } from '../../../../../types';
import useStyles from './styles';
import TableBlock from './TableBlock';

type SpecsTableProps = {
  specs: SpecBlock[];
};

const SpecsTable: React.FC<SpecsTableProps> = ({ specs }) => {
  const styles = useStyles();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Specs
      </Typography>
      <Paper className={styles.paperWrapper}>
        <Box className={styles.boxWrapper}>
          {specs.map((specBlock) => (
            <TableBlock specBlock={specBlock} key={specBlock.name} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default SpecsTable;
