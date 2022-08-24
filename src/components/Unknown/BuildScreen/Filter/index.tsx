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
  title: 'Clock Speed',
  key: 'clockSpeed',
  options: [
    { value: '1.5 GHz - 1.99 GHz', key: '1.5-1.99-GHz' },
    { value: '2.0 GHz - 2.49 GHz', key: '2.0-2.49-GHz' },
    { value: '2.5 GHz - 2.99 GHz', key: '2.5-2.99-GHz' },
    { value: '3.0 GHz and higher', key: '3.0-5.0-GHz' },
  ],
};

const ThreadsFilter = {
  title: 'Threads Number',
  key: 'threads',
  options: [
    { value: '4 threads', key: '4 threads' },
    { value: '8 threads', key: '8 threads' },
    { value: '12 threads', key: '12 threads' },
    { value: '16 threads', key: '16 threads' },
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
