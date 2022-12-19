import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { AppContext } from '../../../AppContext';
import Switcher from '../../../Switcher';
import { Filter } from '../filters';

import useStyles from './styles';

type SwitchFilterProps = {
  filter: Filter;
};

const SwitchFilter: React.FC<SwitchFilterProps> = ({ filter }) => {
  const styles = useStyles();

  const { handleChangeFilters, filters } = useContext(AppContext);

  const handleSwitch = (param: string) => {
    handleChangeFilters({ [filter.key]: param });
  };

  return (
    <Box className={styles.filterWrapper}>
      <Typography gutterBottom variant="h3">
        {filter.title}:
      </Typography>
      <Switcher
        value={filters ? filters[filter.key] : ''}
        onSwitch={handleSwitch}
        options={filter.options}
      />
    </Box>
  );
};

export default SwitchFilter;
