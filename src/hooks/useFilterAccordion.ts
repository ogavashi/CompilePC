import { useState } from 'react';
import useQueryParams from './useQueryParams';

const useFilterAccordion = (name: string) => {
  const { parseCurrentParams } = useQueryParams();

  const parsedParams = parseCurrentParams();

  const params = parsedParams[name] ? [parsedParams[name]].flat() : null;

  const [selectedFilters, setSelectedFilters] = useState<string[] | null>(
    params,
  );

  const handleAddFilter = (value: string) => {
    let updatedFilters;
    if (selectedFilters) {
      updatedFilters = selectedFilters.includes(value)
        ? selectedFilters.filter((filter) => filter !== value)
        : [...selectedFilters, value];
    } else {
      updatedFilters = [value];
    }

    setSelectedFilters(updatedFilters);

    const selectedParamsQuery = { [name]: updatedFilters.join('_') };

    return selectedParamsQuery;
  };

  return { selectedFilters, handleAddFilter };
};

export default useFilterAccordion;
