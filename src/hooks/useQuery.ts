import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParamsChange = (filters: Record<string, string> | null) => {
    const currentParams = Object.fromEntries(Array.from(searchParams));

    const params = {
      ...currentParams,
      ...filters,
    };

    const normalizedFilters = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value),
    );

    setSearchParams({
      ...normalizedFilters,
    });
  };

  const parseCurrentParams = useCallback(() => {
    const currentParams = Object.fromEntries(Array.from(searchParams));

    const normalizedFilters = Object.fromEntries(
      Object.entries(currentParams).filter(([, value]) => value),
    );

    const parsedParams = Object.fromEntries(
      Object.entries(normalizedFilters).map(([key, value]) => [
        key,
        value.includes('_') ? value.split('_') : value,
      ]),
    );

    return parsedParams;
  }, [searchParams]);

  return {
    searchParams,
    setSearchParams,
    handleParamsChange,
    parseCurrentParams,
  };
};

export default useQuery;
