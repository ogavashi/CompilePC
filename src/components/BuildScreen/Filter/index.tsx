import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useFilter from '../../../hooks/useFilter';
import AccordionFilter from './AccordionFilter';
import { filters } from './filters';
import RangeFilter from './RangeFilter';
import useStyles from './styles';
import SwitchFilter from './SwitchFilter';

const Filter: React.FC = () => {
  const styles = useStyles();

  const {
    selectedFilters,
    addAccordionFilter,
    addSwitchFilter,
    handleOpenFilter,
    openedFilter,
    addRangeFilter,
    openedBuilder,
    handleApplyFilters,
  } = useFilter();

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
          {openedBuilder ? (
            <>
              <RangeFilter title="Budget" addRangeFilter={addRangeFilter} />
              {switchFilters}
              {accordionFilters}
            </>
          ) : (
            <Typography className={styles.emptyTitle}>
              Please, select any builder
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={styles.button}
            onClick={handleApplyFilters}
            disabled={!openedBuilder}
          >
            Apply
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Filter;
