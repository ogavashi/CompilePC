import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import useQuery from '../../../../../hooks/useQuery';
import { BuildScreenContext } from '../../../BuildScreenContext';
import Switcher from '../../../Switcher';
import { FilterOption } from '../FilterItem';

import useStyles from './styles';

type SwitchFilterProps = {
  title: string;
  options: FilterOption[];
};

const SwitchFilter: React.FC<SwitchFilterProps> = ({ title, options }) => {
  const styles = useStyles();

  const { searchParams } = useQuery();
  const { handleChangeFilters } = useContext(BuildScreenContext);

  const [value, setValue] = useState<string>(searchParams.get(title) || '');

  const handleSwitch = (param: string) => {
    setValue(param);
    handleChangeFilters({ [title]: param });
  };

  return (
    <Box className={styles.filterWrapper}>
      <Typography gutterBottom variant="h3" className={styles.filterTitle}>
        {title}:
      </Typography>
      <Switcher value={value} onSwitch={handleSwitch} options={options} />
    </Box>
  );
};

export default SwitchFilter;
