import { ButtonBase, Typography } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { SelectedFilter } from '../../../../../types';
import { FilterOption } from '../filters';
import useStyles from './styles';

type FilterItemProps = {
  option: FilterOption;
  filterKey: string;
  addAccordionFilter: CallableFunction;
  selectedFilters: SelectedFilter | null;
};

const FilterItem: React.FC<FilterItemProps> = ({
  option,
  filterKey,
  addAccordionFilter,
  selectedFilters,
}) => {
  const styles = useStyles();

  const isSelected = useMemo(
    () => selectedFilters && selectedFilters[filterKey]?.includes(option.key),

    [filterKey, option.key, selectedFilters],
  );

  return (
    <Box className={styles.wrapper}>
      <ButtonBase
        className={clsx(styles.button, {
          [styles.selected]: isSelected,
        })}
        onClick={() => addAccordionFilter(filterKey, option.key)}
      >
        <Typography textAlign="center">{option.value}</Typography>
      </ButtonBase>
    </Box>
  );
};

export default FilterItem;
