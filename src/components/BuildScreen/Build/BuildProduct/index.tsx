import clsx from 'clsx';
import React, { useMemo } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Typography, Paper } from '@mui/material';
import { IconByCategory } from '../../../../common/constants';
import { CategoryName } from '../../../../../types';
import useStyles from './styles';
import useBuild from '../../../../hooks/useBuild';

type BuildProductProps = {
  category: CategoryName;
};

const BuildProduct: React.FC<BuildProductProps> = ({ category }) => {
  const styles = useStyles();

  const { removePart, build } = useBuild();

  const Icon = useMemo(() => IconByCategory[category], [category]);

  const part = build[category];

  return (
    <Paper className={styles.wrapper}>
      <Icon className={clsx({ [styles.icon]: !part })} />
      <Typography className={styles.partName} variant="h6">
        {part ? part.name : 'Not selected'}
      </Typography>
      {part && (
        <IconButton onClick={() => removePart(category)}>
          <ClearIcon className={styles.redIcon} />
        </IconButton>
      )}
    </Paper>
  );
};

export default BuildProduct;
