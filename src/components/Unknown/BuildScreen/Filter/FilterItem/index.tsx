import { ButtonBase, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';

export type Option = {
  value: string;
  key: string;
};

type FilterItemProps = {
  option: Option;
  handleChangeFiilters: CallableFunction;
  handleAddFilter: CallableFunction;
  selected: Option[];
};

const FilterItem: React.FC<FilterItemProps> = ({
  option,
  handleChangeFiilters,
  handleAddFilter,
  selected,
}) => {
  const styles = useStyles();

  const isSelected = selected.find((item) => item.key === option.key);

  const onClickItem = (value: string) => {
    const queryParam = handleAddFilter(
      isSelected ? { [value]: null } : { [value]: value },
    );
    handleChangeFiilters(queryParam);
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
