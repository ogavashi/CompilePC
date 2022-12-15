import { Paper, Typography } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import useStyles from './styles';

export type Spec = { title: string; value: string | boolean | number };

type TableRowProps = {
  spec: Spec;
};

const TableRow: React.FC<TableRowProps> = ({ spec }) => {
  const styles = useStyles();

  return (
    <Paper className={styles.tableRow}>
      <Typography className={styles.specTitle}>{spec.title}:</Typography>
      <Typography className={styles.specValue}>
        {typeof spec.value === 'boolean' ? (
          <CheckIcon className={styles.checkIcon} />
        ) : (
          spec.value
        )}
      </Typography>
    </Paper>
  );
};

export default TableRow;
