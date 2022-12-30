import { useState } from 'react';
import useQueryParams from './useQueryParams';

const useFilterAccordion = (name: string) => {
  const { parseCurrentParams } = useQueryParams();

  const parsedParams = parseCurrentParams();

  const params = parsedParams[name] ? [parsedParams[name]].flat() : null;

  const [selectedOptions, setSelectedOptions] = useState<string[] | null>(
    params,
  );

  const handleAddFilter = (value: string) => {
    let updatedFilters;
    if (selectedOptions) {
      updatedFilters = selectedOptions.includes(value)
        ? selectedOptions.filter((filter) => filter !== value)
        : [...selectedOptions, value];
    } else {
      updatedFilters = [value];
    }

    setSelectedOptions(updatedFilters);

    const selectedParamsQuery = { [name]: updatedFilters.join('_') };

    return selectedParamsQuery;
  };

  return { selectedOptions, handleAddFilter };
};

export default useFilterAccordion;
