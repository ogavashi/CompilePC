import { Slider, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import useDebounce from '../../../../../hooks/useDebounce';
import usePriceInputs, {
  PriceRange,
} from '../../../../../hooks/usePriceInputs';
import useQuery from '../../../../../hooks/useQuery';
import { BuildScreenContext } from '../../../BuildScreenContext';
import useStyles from './styles';

export type Param = {
  [key: string]: string;
};

type RangeFilterProps = {
  title: string;
};

const RangeFilter: React.FC<RangeFilterProps> = ({ title }) => {
  const styles = useStyles();
  const { searchParams } = useQuery();
  const { handleChangeFilters } = useContext(BuildScreenContext);

  const {
    priceRange,
    handleMinPrice,
    handleMaxPrice,
    validateRange,
    handleSliderChange,
  } = usePriceInputs(searchParams);

  const debouncedValue = useDebounce<PriceRange>(priceRange, 20);

  useEffect(() => {
    handleChangeFilters({
      minPrice: String(debouncedValue.minPrice),
      maxPrice: String(debouncedValue.maxPrice),
    });
  }, [debouncedValue, handleChangeFilters]);

  return (
    <Box className={styles.wrapper}>
      <Typography gutterBottom variant="h3">
        {title}:
      </Typography>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <TextField
          className={styles.textField}
          value={priceRange.minPrice}
          onChange={handleMinPrice}
          onBlur={validateRange}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          className={styles.textField}
          value={priceRange.maxPrice}
          onChange={handleMaxPrice}
          onBlur={validateRange}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
