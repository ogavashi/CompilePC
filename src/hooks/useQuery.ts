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
  return { searchParams, handleParamsChange };
};

export default useQuery;
