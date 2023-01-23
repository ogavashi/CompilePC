import clsx from 'clsx';
import React, { useMemo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';
import { IconByCategory, ROUTES } from '../../../../common/constants';
import { CategoryName, Part } from '../../../../../types';
import useStyles from './styles';
import { getAveragePrice } from '../../../../utils/assembly';

type AssemblyCardItemProps = {
  part: Part | null;
  category: CategoryName;
};

const AssemblyCardItem: React.FC<AssemblyCardItemProps> = ({
  part,
  category,
}) => {
  const styles = useStyles();

  const averagePrice = useMemo(() => part && getAveragePrice(part), [part]);

  const Icon = useMemo(() => IconByCategory[category], [category]);

  if (!part) {
    return null;
  }

  return (
    <Paper className={styles.wrapper}>
      <Icon className={clsx({ [styles.icon]: !part })} />
      <Link
        style={{ textDecoration: 'none' }}
        to={generatePath(ROUTES.PRODUCT, { category, id: part.id })}
      >
        <Typography className={styles.partName} variant="h5">
          {part ? part.name : 'Not selected'}
        </Typography>
      </Link>
      <Typography className={styles.partName} variant="h5">
        {averagePrice} ₴
      </Typography>
    </Paper>
  );
};

export default AssemblyCardItem;
