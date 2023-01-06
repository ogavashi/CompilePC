import { regexes } from './constants';

const naormalizeFilter = (params: Record<string, string | string[]>) => {
  const generateRange = (prop: string) => {
    const array = prop.split('-');
    const range = Array.from(
      { length: (Number(array[1]) - Number(array[0])) * 10 + 1 },
      (_, i) => `${(i + Number(array[0]) * 10) / 10} ${array[2]}`,
    );
    return range;
  };

  const parseProp = (prop: string) => {
    if (regexes.numericFormat.test(prop)) return prop;
    if (prop.includes('-')) return generateRange(prop);
    return [prop];
  };

  const normalizedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value),
  );

  const parsedFilters = Object.fromEntries(
    Object.entries(normalizedParams).map(([key, value]) => [
      key,
      Array.isArray(value)
        ? value.map((el) => parseProp(el)).flat()
        : parseProp(value),
    ]),
  );

  const properFilter = Object.fromEntries(
    Object.entries(parsedFilters)
      .map(([key]) => [
        key,
        {
          ['$in']: parsedFilters[key],
        },
      ])
      .filter(
        ([key]) =>
          key !== 'maxPrice' && key !== 'minPrice' && key !== 'searchValue',
      ),
  );

  if (parsedFilters.maxPrice && parsedFilters.minPrice) {
    Object.assign(properFilter, {
      ['price.range.maxPrice']: {
        $lte: Number(parsedFilters.maxPrice) || 50000,
      },
      ['price.range.minPrice']: {
        $gte: Number(parsedFilters.minPrice) || 0,
      },
    });
  }

  if (normalizedParams.searchValue) {
    Object.assign(properFilter, {
      $text: {
        $search: normalizedParams.searchValue,
      },
    });
  }

  console.log(properFilter);

  return properFilter;
};

export default naormalizeFilter;
