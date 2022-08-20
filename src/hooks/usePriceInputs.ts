import { useState } from 'react';

const usePriceInputs = (searchParams: URLSearchParams) => {
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 50000,
  ]);
  const minDistance = 1000;
  const regex = /^[0-9]*$/;

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regex.test(e.target.value)) {
      const value = Number(e.target.value);
      setPriceRange([value, priceRange[1]]);
    }
  };
  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regex.test(e.target.value)) {
      const value = Number(e.target.value);
      setPriceRange([priceRange[0], value]);
    }
  };

  const validateRange = () => {
    if (priceRange[0] > priceRange[1])
      setPriceRange([priceRange[1], priceRange[0]]);
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 50000 - minDistance);
        setPriceRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPriceRange([clamped - minDistance, clamped]);
      }
    } else {
      setPriceRange(newValue as number[]);
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
