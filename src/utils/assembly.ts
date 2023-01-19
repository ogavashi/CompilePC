import { Assembly, CategoryName, Part } from '../../types';

const getAverageSum = (assembly: Assembly): number => {
  const minPrice = Object.keys(assembly).reduce((sum, key) => {
    const part = assembly[key as CategoryName];
    return part ? sum + part.price.range.minPrice : sum + 0;
  }, 0);

  const maxPrice = Object.keys(assembly).reduce((sum, key) => {
    const part = assembly[key as CategoryName];
    return part ? sum + part.price.range.maxPrice : sum + 0;
  }, 0);

  return Math.round((maxPrice + minPrice) / 2);
};

const getAveragePrice = (part: Part): number => {
  const { minPrice } = part.price.range;
  const { maxPrice } = part.price.range;

  return Math.round((maxPrice + minPrice) / 2);
};

const isEmpty = (assembly: Assembly): boolean =>
  Object.values(assembly).every((part) => !part);

export { getAverageSum, getAveragePrice, isEmpty };
