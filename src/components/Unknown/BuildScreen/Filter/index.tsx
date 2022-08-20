import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import useQuery from '../../../../hooks/useQuery';
import RangeFilter from './RangeFilter';

import useStyles from './styles';
import SwitchFilter from './SwitchFilter';

const CPUFilters = [
  { value: 'INTEL', key: 'intel' },
  { value: 'AMD', key: 'amd' },
];

const GPUFilters = [
  { value: 'NVIDIA', key: 'nvidia' },
  { value: 'AMD', key: 'amd' },
];

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
      <SwitchFilter
        title="cpu"
        options={CPUFilters}
        handleChangeFilters={handleChangeFilters}
      />
      <SwitchFilter
        title="gpu"
        options={GPUFilters}
        handleChangeFilters={handleChangeFilters}
      />
      <RangeFilter title="Budget" handleChangeFilters={handleChangeFilters} />

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
