import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import useQuery from '../../../../../hooks/useQuery';
import { BuildScreenContext } from '../../../BuildScreenContext';
import Switcher from '../../../Switcher';
import { Filter } from '../filters';

import useStyles from './styles';

type SwitchFilterProps = {
  filter: Filter;
};

const SwitchFilter: React.FC<SwitchFilterProps> = ({ filter }) => {
  const styles = useStyles();

  const { searchParams } = useQuery();
  const { handleChangeFilters } = useContext(BuildScreenContext);

  const [value, setValue] = useState<string>(
    searchParams.get(filter.key) || '',
  );

  const handleSwitch = (param: string) => {
    setValue(param);
    handleChangeFilters({ [filter.key]: param });
  };

  return (
    <Box className={styles.filterWrapper}>
      <Typography gutterBottom variant="h3" className={styles.filterTitle}>
        {filter.title}:
      </Typography>
      <Switcher
        value={value}
        onSwitch={handleSwitch}
        options={filter.options}
      />
    </Box>
  );
};

export default SwitchFilter;
