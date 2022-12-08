import React, { createContext, useCallback, useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import { ProductCategory } from '../../../../types';

export const BuildScreenContext = createContext<BuildScreenProps>(
  {} as BuildScreenProps,
);

interface BuildScreenProps {
  selectedBuilder: ProductCategory | null;
  selectedFilter: string | null;
  filters: Record<string, string> | null;
  handleSelectBuilder: (value: ProductCategory) => void;
  handleSelectFilter: (value: string) => void;
  handleChangeFilters: (value: Record<string, string> | null) => void;
  setSelectedFilter: (value: string | null) => void;
}

export const BuildScreenContextProvider: React.FC = ({ children }) => {
  // TODO: Move selectedBuilder to query string
  const [selectedBuilder, setSelectedBuilder] =
    useState<ProductCategory | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string> | null>(null);

  const { setSearchParams } = useQuery();

  const handleSelectBuilder = (panel: ProductCategory) => {
    // Erase query string and filters in state whenever new builder is opened
    if (panel !== selectedBuilder && selectedBuilder !== null) {
      setSearchParams({});
      setFilters(null);
    }
    setSelectedBuilder((prev) => (prev === panel ? null : panel));
  };

  const handleSelectFilter = (panel: string) => {
    setSelectedFilter((prev) => (prev === panel ? null : panel));
  };

  const handleChangeFilters = useCallback(
    (filter: Record<string, string> | null) => {
      setFilters((prev) => ({ ...prev, ...filter }));
    },
    [],
  );

  return (
    <BuildScreenContext.Provider
      value={{
        selectedBuilder,
        handleSelectBuilder,
        selectedFilter,
        handleSelectFilter,
        setSelectedFilter,
        filters,
        handleChangeFilters,
      }}
    >
      {children}
    </BuildScreenContext.Provider>
  );
};
