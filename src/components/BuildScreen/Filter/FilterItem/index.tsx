import { ButtonBase, Typography } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { AppContext } from '../../../AppContext';
import { FilterOption } from '../filters';
import useStyles from './styles';

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
  const { handleChangeFilters } = useContext(AppContext);

  const isSelected = selectedFilters && selectedFilters.includes(option.key);

  const handleClickFilterItem = (value: string) => {
    const selectedParamsQuery = handleAddFilter(value);
    handleChangeFilters(selectedParamsQuery);
  };

  return (
    <Box className={styles.wrapper}>
      <ButtonBase
        className={clsx(styles.button, {
          [styles.selected]: isSelected,
        })}
        onClick={() => handleClickFilterItem(option.key)}
      >
        <Typography textAlign="center">{option.value}</Typography>
      </ButtonBase>
    </Box>
  );
};

export default FilterItem;
