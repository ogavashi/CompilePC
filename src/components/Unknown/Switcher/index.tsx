import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import useStyles from './styles';

type SwitcherProps = {
  value: string;
  setValue: CallableFunction;
  choices: [string, string];
};

const Switcher: React.FC<SwitcherProps> = ({ value, setValue, choices }) => {
  const [firstValue, secondValue] = choices;
  const styles = useStyles();
  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    setValue(newValue);
  };
  return (
    <ToggleButtonGroup
      className={styles.toggleButtonGroup}
      value={value}
      onChange={handleSelect}
      exclusive
    >
      <ToggleButton className={styles.switcherButton} value={firstValue}>
        {firstValue}
      </ToggleButton>
      <ToggleButton className={styles.switcherButton} value={secondValue}>
        {secondValue}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Switcher;
