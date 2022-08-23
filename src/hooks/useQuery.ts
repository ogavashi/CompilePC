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
      Object.entries(params).filter(([_, v]) => v),
    );

    setSearchParams({
      ...normalizedFilters,
    });
  };

  const parseCurrentParams = () => {
    const currentParams = Object.fromEntries(Array.from(searchParams));

    const parsedParams = Object.fromEntries(
      Object.entries(currentParams).map(([k, v]) => [
        k,
        v.includes('_') ? v.split('_') : v,
      ]),
    );

    return parsedParams;
  };

  const parsedParams = parseCurrentParams();

  return { searchParams, handleParamsChange, parsedParams };
};

export default useQuery;
