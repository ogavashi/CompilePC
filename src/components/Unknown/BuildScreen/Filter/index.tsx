import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import useQuery from '../../../../hooks/useQuery';
import RangeFilter from './RangeFilter';

import useStyles from './styles';
import SwitchFilter from './SwitchFilter';

const Filters: React.FC = () => {
  const styles = useStyles();

  const { handleParamsChange } = useQuery();

  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleChangeFilters = useCallback((filter: Record<string, string>) => {
    setFilters((prev) => {
      return {
        ...prev,
        ...filter,
      };
    });
  }, []);

  const handleApplyFilters = () => {
    handleParamsChange(filters);
  };

  return (
    <Box className={styles.wrapper}>
      <SwitchFilter
        title="cpu"
        options={[
          { value: 'INTEL', key: 'intel' },
          { value: 'AMD', key: 'amd' },
        ]}
        handleChangeFilters={handleChangeFilters}
      />
      <SwitchFilter
        title="gpu"
        options={[
          { value: 'NVIDIA', key: 'nvidia' },
          { value: 'AMD', key: 'amd' },
        ]}
        handleChangeFilters={handleChangeFilters}
      />
      <RangeFilter title="Budget" handleChangeFilters={handleChangeFilters} />

      <Button
        className={styles.button}
        variant="contained"
        color="secondary"
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
    </Box>
  );
};

export default Filters;
