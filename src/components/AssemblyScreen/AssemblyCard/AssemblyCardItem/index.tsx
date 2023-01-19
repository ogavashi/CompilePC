import clsx from 'clsx';
import React, { useMemo } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { generatePath, Link } from 'react-router-dom';
import { IconButton, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconByCategory, ROUTES } from '../../../../common/constants';
import { CategoryName } from '../../../../../types';
import useStyles from './styles';
import { selectAssemblyPart } from '../../../../store/builder/selectors';
import { removeAssemblyPart } from '../../../../store/builder/slice';
import { getAveragePrice } from '../../../../utils/assembly';

type AssemblyCardItemProps = {
  category: CategoryName;
};

const AssemblyCardItem: React.FC<AssemblyCardItemProps> = ({ category }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const part = useSelector(selectAssemblyPart(category));

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
