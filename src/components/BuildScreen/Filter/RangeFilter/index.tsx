import { InputBase, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { PriceRange, SelectedFilter } from '../../../../../types';
import { NUMERIC_FORMAT } from '../../../../common/constants';
import useDebounce from '../../../../hooks/useDebounce';
import usePriceInputs from '../../../../hooks/usePriceInputs';

export type Param = {
  [key: string]: string;
};

type RangeFilterProps = {
  title: string;
  addRangeFilter: (value: SelectedFilter) => void;
};

const RangeFilter: React.FC<RangeFilterProps> = ({ title, addRangeFilter }) => {
  const {
    priceRange,
    handleMinPrice,
    handleMaxPrice,
    validateRange,
    handleSliderChange,
  } = usePriceInputs();

  const debouncedValue = useDebounce<PriceRange>(priceRange, 30);

  useEffect(() => {
    addRangeFilter({
      minPrice: String(debouncedValue.minPrice),
      maxPrice: String(debouncedValue.maxPrice),
    });
  }, [debouncedValue, addRangeFilter]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Typography gutterBottom variant="h3">
        {title}:
      </Typography>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <InputBase
          fullWidth
          value={priceRange.minPrice}
          onChange={handleMinPrice}
          onBlur={validateRange}
          inputProps={{ inputMode: 'numeric', pattern: NUMERIC_FORMAT }}
        />
        <InputBase
          value={priceRange.maxPrice}
          onChange={handleMaxPrice}
          onBlur={validateRange}
          inputProps={{ inputMode: 'numeric', pattern: NUMERIC_FORMAT }}
        />
      </Box>
      <Slider
        color="secondary"
        value={[priceRange.minPrice, priceRange.maxPrice]}
        max={50000}
        step={1000}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        disableSwap
      />
    </Box>
  );
};

export default RangeFilter;
