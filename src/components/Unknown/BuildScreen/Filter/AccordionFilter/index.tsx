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

import React, { useContext } from 'react';
import useStyles from './styles';
import FilterItem from '../FilterItem';
import useQuery from '../../../../../hooks/useQuery';
import useFilterAccordion from '../../../../../hooks/useFilterAccordion';
import { BuildScreenContext } from '../../../BuildScreenContext';

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
};

const AccordionFilter: React.FC<AccordionFilterProps> = ({ filter }) => {
  const styles = useStyles();

  const { searchParams } = useQuery();
  const { selectedFilters, handleAddFilter } = useFilterAccordion(
    searchParams,
    filter.key,
  );

  const { selectedFilter, handleSelectFilter } = useContext(BuildScreenContext);

  const isSelected = selectedFilters?.length;

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
            handleAddFilter={handleAddFilter}
            selectedFilters={selectedFilters}
            key={option.key}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionFilter;
