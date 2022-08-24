import { WhereFilterOp } from '@firebase/firestore-types';
import { NUMERIC_FORMAT } from '../common/constants';
import useQuery from './useQuery';

const useFilterRef = () => {
  const { parsedParams } = useQuery();

  const getOperator = (key: string): WhereFilterOp => {
    switch (key) {
      case 'minPrice':
        return '>=';
      case 'maxPrice':
        return '<=';
      default:
        return 'in';
    }
  };

  const getName = (key: string) => {
    if (key === 'minPrice' || key === 'maxPrice') return 'price';
    return key;
  };

  const generateRange = (prop: string) => {
    const array = prop.split('-');
    const range = Array.from(
      { length: (Number(array[1]) - Number(array[0])) * 10 + 1 },
      (_, i) => `${(i + Number(array[0]) * 10) / 10} ${array[2]}`,
    );
    return range;
  };

  const parseProp = (prop: string) => {
    if (NUMERIC_FORMAT.test(prop)) return prop;
    if (prop.includes('-')) return generateRange(prop);
    return [prop];
  };

  const getProperFilter = () => {
    const parsedFilters = Object.fromEntries(
      Object.entries(parsedParams).map(([k, v]) => [
        k,
        Array.isArray(v) ? v.map((el) => parseProp(el)).flat() : parseProp(v),
      ]),
    );

    const properFilter = Object.fromEntries(
      Object.entries(parsedParams).map(([key, _]) => [
        key,
        {
          name: getName(key),
          operator: getOperator(key),
          value: parsedFilters[key],
        },
      ]),
    );

    return properFilter;
  };

  const filter = getProperFilter();

  return { filter };
};

export default useFilterRef;
