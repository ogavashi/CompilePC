import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import useQuery from '../../../../hooks/useQuery';
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
    { value: '1.5 GHz - 1.99 GHz', key: '1' },
    { value: '2.0 GHz - 2.49 GHz', key: '2' },
    { value: '2.5 GHz - 2.99 GHz', key: '3' },
    { value: '3.0 GHz and higher', key: '4' },
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

  const [filters, setFilters] = useState<Record<string, string> | null>(null);

  const handleChangeFilters = useCallback((filter: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...filter }));
  }, []);

  const handleApplyFilters = () => {
    handleParamsChange(filters);
  };

  return (
    <Box className={styles.wrapper}>
      {/* <SwitchFilter
        title="cpu"
        options={CPUFilters}
        handleChangeFilters={handleChangeFilters}
      />
      <SwitchFilter
        title="gpu"
        options={GPUFilters}
        handleChangeFilters={handleChangeFilters}
      /> */}
      <RangeFilter title="Budget" handleChangeFilters={handleChangeFilters} />
      <AccordionFilter
        filter={OperatingFrequencyFilter}
        handleChangeFilters={handleChangeFilters}
      />
      <AccordionFilter
        filter={ThreadsFilter}
        handleChangeFilters={handleChangeFilters}
      />
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
    </Box>
  );
};

export default Filter;
