import { ButtonBase, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { BuildScreenContext } from '../../../BuildScreenContext';
import useStyles from './styles';

export type Option = {
  value: string;
  key: string;
};

type FilterItemProps = {
  option: Option;
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

  const onClickItem = (value: string) => {
    const selectedParamsQuery = handleAddFilter(value);
    handleChangeFilters(selectedParamsQuery);
  };

  return (
    <Box className={styles.wrapper}>
      <ButtonBase
        className={`${styles.button} ${isSelected && styles.selected}`}
        onClick={() => onClickItem(option.key)}
      >
        <Typography textAlign="center">{option.value}</Typography>
      </ButtonBase>
    </Box>
  );
};

export default FilterItem;
