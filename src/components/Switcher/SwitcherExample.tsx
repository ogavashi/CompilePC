import React, { useState } from 'react';
import Switcher from '.';

const SwitcherExample: React.FC = () => {
  const [value, setValue] = useState<string>('AMD');
  return (
    <Switcher
      value={value}
      onSwitch={setValue}
      options={[
        { value: 'NVIDIA', key: 'nvidia' },
        { value: 'AMD', key: 'amd' },
      ]}
    />
  );
};

export default SwitcherExample;
