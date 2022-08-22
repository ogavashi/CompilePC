import { useState } from 'react';

const useFilterAccordion = (searchParams: URLSearchParams, name: string) => {
  const currentParams = searchParams.get(name) || '';

  const normalizedParams = currentParams
    ? currentParams.split('_').reduce((a, v) => ({ ...a, [v]: v }), {})
    : {};

  const [filters, setFilters] =
    useState<Record<string, string | null>>(normalizedParams);

  const handleAddFilter = (value: Record<string, string | null>) => {
    const currentFilters = { ...filters, ...value };

    const normalizedFilters = Object.fromEntries(
      Object.entries(currentFilters).filter(([_, v]) => v),
    );

    setFilters(normalizedFilters);

    const filtersString = Object.keys(normalizedFilters).join('_');

    return {
      [name]: filtersString,
    };
  };

  return { filters, handleAddFilter };
};

export default useFilterAccordion;
