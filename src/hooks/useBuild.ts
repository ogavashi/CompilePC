import { useContext } from 'react';
import { CategoryName } from '../../types';
import { AppContext } from '../components/AppContext/index';

const useBuild = () => {
  const { build, clearBuild, addPart, removePart } = useContext(AppContext);

  const getAverageSum = () => {
    const minPrice = Object.keys(build).reduce((sum, key) => {
      const part = build[key as CategoryName];
      return part ? sum + part.price.range.minPrice : sum + 0;
    }, 0);

    const maxPrice = Object.keys(build).reduce((sum, key) => {
      const part = build[key as CategoryName];
      return part ? sum + part.price.range.maxPrice : sum + 0;
    }, 0);

    return Math.round((maxPrice + minPrice) / 2);
  };

  const isEmpty = (() => Object.values(build).every((part) => !part))();

  return { build, getAverageSum, clearBuild, addPart, removePart, isEmpty };
};

export default useBuild;
