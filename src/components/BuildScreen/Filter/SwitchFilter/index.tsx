import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useMemo } from 'react';
import { SelectedFilter } from '../../../../../types';
import { AppContext } from '../../../AppContext';
import Switcher from '../../../Switcher';
import { Filter } from '../filters';

import useStyles from './styles';

type SwitchFilterProps = {
  filter: Filter;
  addSwitchFilter: (key: string, value: string) => void;
  selectedFilters: SelectedFilter | null;
};

const SwitchFilter: React.FC<SwitchFilterProps> = ({
  filter,
  addSwitchFilter,
  selectedFilters,
}) => {
  const styles = useStyles();

  const selected = useMemo(
    () => (selectedFilters && selectedFilters[filter.key]) || '',
    [filter.key, selectedFilters],
  );

  const handleSwitch = (value: string) => {
    addSwitchFilter(filter.key, value);
  };

  return (
    <Box className={styles.filterWrapper}>
      <Typography gutterBottom variant="h3">
        {filter.title}:
      </Typography>
      <Switcher
        value={selected as string}
        onSwitch={handleSwitch}
        options={filter.options}
      />
    </Box>
  );
};

export default SwitchFilter;
