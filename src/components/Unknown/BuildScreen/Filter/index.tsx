import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import useQuery from '../../../../hooks/useQuery';
import { BuildScreenContext } from '../../BuildScreenContext';
import AccordionFilter from './AccordionFilter';
import RangeFilter from './RangeFilter';

import useStyles from './styles';
// import SwitchFilter from './SwitchFilter';

// const CPUFilters = [
//   { value: 'INTEL', key: 'intel' },
//   { value: 'AMD', key: 'amd' },
// ];

// const GPUFilters = [
//   { value: 'NVIDIA', key: 'nvidia' },
//   { value: 'AMD', key: 'amd' },
// ];

const OperatingFrequencyFilter = {
  title: 'Operating Frequency',
  key: 'frequency',
  options: [
    { value: '1.5 GHz - 1.99 GHz', key: '1.5-1.99' },
    { value: '2.0 GHz - 2.49 GHz', key: '2.0-2.49' },
    { value: '2.5 GHz - 2.99 GHz', key: '2.5-2.99' },
    { value: '3.0 GHz and higher', key: '3.0' },
  ],
};

const ThreadsFilter = {
  title: 'Threads Number',
  key: 'threads',
  options: [
    { value: '4', key: '4' },
    { value: '8', key: '8' },
    { value: '12', key: '12' },
    { value: '16', key: '16' },
  ],
};

const Filter: React.FC = () => {
  const styles = useStyles();

  const { handleParamsChange } = useQuery();
  const { filters } = useContext(BuildScreenContext);

  const handleApplyFilters = () => {
    handleParamsChange(filters);
  };

  return (
    <Box className={styles.wrapper}>
      {/* <SwitchFilter
        title="cpu"
        options={CPUFilters}
      />
      <SwitchFilter
        title="gpu"
        options={GPUFilters}
      /> */}
      <RangeFilter title="Budget" />
      <AccordionFilter filter={OperatingFrequencyFilter} />
      <AccordionFilter filter={ThreadsFilter} />
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        className={styles.button}
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
    </Box>
  );
};

export default Filter;
