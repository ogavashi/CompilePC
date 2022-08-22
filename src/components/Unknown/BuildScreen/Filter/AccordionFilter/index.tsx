import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import React, { useContext, useState } from 'react';
import useStyles from './styles';
import FilterItem from '../FilterItem';
import useQuery from '../../../../../hooks/useQuery';
import { BuildScreenContext } from '../../../BuildScreenContext';
import useFilterAccordion from '../../../../../hooks/useFilterAccordion';

type Option = {
  value: string;
  key: string;
};

type Filter = {
  title: string;
  key: string;
  options: Option[];
};

type AccordionFilterProps = {
  filter: Filter;
  handleChangeFilters: CallableFunction;
};

const AccordionFilter: React.FC<AccordionFilterProps> = ({
  filter,
  handleChangeFilters,
}) => {
  const styles = useStyles();

  const { searchParams } = useQuery();

  const { selectedFilter, handleSelectFilter } = useContext(BuildScreenContext);

  const { filters, handleAddFilter } = useFilterAccordion(
    searchParams,
    filter.key,
  );

  const isSelected = Boolean(Object.keys(filters).length);

  const selected = filter.options.filter((option) => filters[option.key]);

  const DisplayReplace = () =>
    isSelected ? (
      <IconButton onClick={() => handleSelectFilter(filter.key)}>
        <SwapHorizIcon className={styles.greenIcon} />
      </IconButton>
    ) : (
      <IconButton onClick={() => handleSelectFilter(filter.key)}>
        <AddRoundedIcon className={styles.greenIcon} />
      </IconButton>
    );

  return (
    <Accordion
      className={styles.wrapper}
      expanded={selectedFilter === filter.key}
    >
      <AccordionSummary
        className={styles.accordionSummary}
        expandIcon={
          selectedFilter === filter.key ? (
            <IconButton onClick={() => handleSelectFilter(filter.key)}>
              <RemoveRoundedIcon className={styles.redIcon} />
            </IconButton>
          ) : (
            <DisplayReplace />
          )
        }
      >
        <Typography className={styles.title}>{filter.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {filter.options.map((option) => (
          <FilterItem
            option={option}
            handleChangeFiilters={handleChangeFilters}
            handleAddFilter={handleAddFilter}
            selected={selected}
            key={option.key}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionFilter;
