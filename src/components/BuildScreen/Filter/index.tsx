import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFilter from '../../../hooks/useFilter';
import { selectOpenedBuilder } from '../../../store/builder/selectors';
import { setFilter } from '../../../store/builder/slice';
import AccordionFilter from './AccordionFilter';
import { filters } from './filters';
import RangeFilter from './RangeFilter';
import useStyles from './styles';
import SwitchFilter from './SwitchFilter';

const Filter: React.FC = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const openedBuilder = useSelector(selectOpenedBuilder);

  const {
    selectedFilters,
    addAccordionFilter,
    addSwitchFilter,
    handleOpenFilter,
    setOpenedFilter,
    openedFilter,
  } = useFilter(openedBuilder);

  const handleApplyFilters = () => {
    if (openedBuilder && selectedFilters) {
      dispatch(
        setFilter({
          category: openedBuilder,
          filter: selectedFilters,
        }),
      );
    }
    setOpenedFilter(null);
  };

  const accordions = openedBuilder && filters[openedBuilder].accordion;

  const switchers = openedBuilder && filters[openedBuilder].switcher;

  const accordionFilters =
    accordions &&
    accordions.map((filter) => (
      <AccordionFilter
        addAccordionFilter={addAccordionFilter}
        selectedFilters={selectedFilters}
        filter={filter}
        key={filter.key}
        handleOpenFilter={handleOpenFilter}
        openedFilter={openedFilter}
      />
    ));

  const switchFilters =
    switchers &&
    switchers.map((filter) => (
      <SwitchFilter
        addSwitchFilter={addSwitchFilter}
        selectedFilters={selectedFilters}
        filter={filter}
        key={filter.key}
      />
    ));

  return (
    <Box className={styles.sideSection}>
      <Typography gutterBottom variant="h2">
        Filters
      </Typography>
      <Paper>
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
      </Paper>
    </Box>
  );
};

export default Filter;
