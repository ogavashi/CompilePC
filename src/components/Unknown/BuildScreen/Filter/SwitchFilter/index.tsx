import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useQuery from '../../../../../hooks/useQuery';

import Switcher, { Option } from '../../../Switcher';
import useStyles from './styles';

type SwitchFilterProps = {
  title: string;
  options: Option[];
  handleChangeFilters: CallableFunction;
};

const SwitchFilter: React.FC<SwitchFilterProps> = ({
  title,
  options,
  handleChangeFilters,
}) => {
  const styles = useStyles();

  const { searchParams } = useQuery();

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
