import { useState } from 'react';
import { MIN_PRICE_SLIDER_DISTANCE, NUMERIC_FORMAT } from '../common/constants';
import useQuery from './useQuery';

export type PriceRange = {
  minPrice: number;
  maxPrice: number;
};

const usePriceInputs = () => {
  const { parseCurrentParams } = useQuery();

  const parsedParams = parseCurrentParams();

  const [priceRange, setPriceRange] = useState<PriceRange>({
    minPrice: Number(parsedParams.minPrice) || 0,
    maxPrice: Number(parsedParams.maxPrice) || 50000,
  });

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NUMERIC_FORMAT.test(e.target.value)) {
      const value = Number(e.target.value);
      setPriceRange({ minPrice: value, maxPrice: priceRange.maxPrice });
    }
  };
  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NUMERIC_FORMAT.test(e.target.value)) {
      const value = Number(e.target.value);
      setPriceRange({ minPrice: priceRange.minPrice, maxPrice: value });
    }
  };

  const validateRange = () => {
    if (priceRange.minPrice > priceRange.maxPrice)
      setPriceRange({
        minPrice: priceRange.maxPrice,
        maxPrice: priceRange.minPrice,
      });
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    const atBeginning = activeThumb === 0;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < MIN_PRICE_SLIDER_DISTANCE) {
      const clamped = atBeginning
        ? Math.min(newValue[0], 50000 - MIN_PRICE_SLIDER_DISTANCE)
        : Math.max(newValue[1], MIN_PRICE_SLIDER_DISTANCE);
      setPriceRange({
        minPrice: atBeginning ? clamped : clamped - MIN_PRICE_SLIDER_DISTANCE,
        maxPrice: atBeginning ? clamped + MIN_PRICE_SLIDER_DISTANCE : clamped,
      });
    } else {
      setPriceRange({
        minPrice: newValue[0],
        maxPrice: newValue[1],
      });
    }
  };

  return {
    priceRange,
    handleMinPrice,
    handleMaxPrice,
    validateRange,
    handleSliderChange,
  };
};

export default usePriceInputs;
