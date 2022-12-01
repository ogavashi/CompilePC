import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import TableRow, { Spec } from '../TableRow';
import useStyles from './styles';

export type SpecBlock = {
  name: string;
  specs: Spec[];
};

type TableBlockProps = {
  specBlock: SpecBlock;
};

const TableBlock: React.FC<TableBlockProps> = ({ specBlock }) => {
  const styles = useStyles();

  return (
    <Box className={styles.tableBlock}>
      <Typography variant="h4">{specBlock.name}</Typography>
      {specBlock.specs.map((spec) => (
        <TableRow spec={spec} key={spec.title} />
      ))}
    </Box>
  );
};

export default TableBlock;
