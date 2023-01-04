import clsx from 'clsx';
import React, { useMemo } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconByCategory } from '../../../../common/constants';
import { CategoryName } from '../../../../../types';
import useStyles from './styles';
import { selectAssemblyPart } from '../../../../store/builder/selectors';
import { removeAssemblyPart } from '../../../../store/builder/slice';

type AssemblyPartProps = {
  category: CategoryName;
};

const AssemblyPart: React.FC<AssemblyPartProps> = ({ category }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const part = useSelector(selectAssemblyPart(category));

  const Icon = useMemo(() => IconByCategory[category], [category]);

  return (
    <Paper className={styles.wrapper}>
      <Icon className={clsx({ [styles.icon]: !part })} />
      <Typography className={styles.partName} variant="h6">
        {part ? part.name : 'Not selected'}
      </Typography>
      {part && (
        <IconButton onClick={() => dispatch(removeAssemblyPart(category))}>
          <ClearIcon className={styles.redIcon} />
        </IconButton>
      )}
    </Paper>
  );
};

export default AssemblyPart;
