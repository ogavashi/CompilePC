import { ButtonBase, Typography } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { BuildScreenContext } from '../../../BuildScreenContext';
import useStyles from './styles';

export type FilterOption = {
  value: string;
  key: string;
};

type FilterItemProps = {
  option: FilterOption;
  handleAddFilter: CallableFunction;
  selectedFilters: string[] | null;
};

const FilterItem: React.FC<FilterItemProps> = ({
  option,
  handleAddFilter,
  selectedFilters,
}) => {
  const styles = useStyles();
  const { handleChangeFilters } = useContext(BuildScreenContext);

  const isSelected = selectedFilters && selectedFilters.includes(option.key);

  const handleClickFilterItem = (value: string) => {
    const selectedParamsQuery = handleAddFilter(value);
    handleChangeFilters(selectedParamsQuery);
  };

  const buttonClasses = clsx({
    [styles.button]: true,
    [styles.selected]: isSelected,
  });

  return (
    <Box className={styles.wrapper}>
      <ButtonBase
        className={buttonClasses}
        onClick={() => handleClickFilterItem(option.key)}
      >
        <Typography textAlign="center">{option.value}</Typography>
      </ButtonBase>
    </Box>
  );
};

export default FilterItem;
