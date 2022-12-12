import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import useQueryParams from '../../../../hooks/useQueryParams';
import { BuildScreenContext } from '../../BuildScreenContext';
import AccordionFilter from './AccordionFilter';
import { filters } from './filters';
import RangeFilter from './RangeFilter';

import useStyles from './styles';
import SwitchFilter from './SwitchFilter';

const Filter: React.FC = () => {
  const styles = useStyles();

  const { handleParamsChange } = useQueryParams();
  const {
    filters: selectedFilters,
    selectedBuilder,
    setSelectedFilter,
  } = useContext(BuildScreenContext);

  const handleApplyFilters = () => {
    setSelectedFilter(null);
    handleParamsChange(selectedFilters);
  };

  const accordions =
    selectedBuilder && filters[selectedBuilder.categoryName].accordion;

  const switchers =
    selectedBuilder && filters[selectedBuilder.categoryName].switcher;

  const accordionFilters =
    accordions &&
    accordions.map((filter) => (
      <AccordionFilter filter={filter} key={filter.key} />
    ));

  const switchFilters =
    switchers &&
    switchers.map((filter) => (
      <SwitchFilter filter={filter} key={filter.key} />
    ));

  return (
    <Box className={styles.wrapper}>
      <RangeFilter title="Budget" />
      {switchFilters}
      {accordionFilters}
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
