import { useState } from 'react';

const useFilterAccordion = (searchParams: URLSearchParams, name: string) => {
  const currentParams = searchParams.get(name) || '';

  const normalizedParams = currentParams ? currentParams.split('_') : null;

  const [selectedFilters, setSelectedFilters] = useState<string[] | null>(
    normalizedParams,
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
