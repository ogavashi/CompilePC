import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { FilterOption } from '../BuildScreen/Filter/filters';

import useStyles from './styles';

type SwitcherProps = {
  value: string;
  onSwitch: CallableFunction;
  options: FilterOption[];
};

const Switcher: React.FC<SwitcherProps> = ({ value, onSwitch, options }) => {
  const styles = useStyles();

  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    onSwitch(newValue);
  };

  return (
    <ToggleButtonGroup
      className={styles.toggleButtonGroup}
      value={value}
      onChange={handleSelect}
      exclusive
    >
      {options.map((option) => (
        <ToggleButton
          className={styles.switcherButton}
          value={option.key}
          key={option.key}
        >
          {option.value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Switcher;
