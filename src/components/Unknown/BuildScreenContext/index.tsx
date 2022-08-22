import React, { createContext, useCallback, useState } from 'react';

export const BuildScreenContext = createContext<BuildScreenProps>(
  {} as BuildScreenProps,
);

interface BuildScreenProps {
  selectedBuilder: string | null;
  selectedFilter: string | null;
  filters: Record<string, string> | null;
  handleSelectBuilder: (value: string) => void;
  handleSelectFilter: (value: string) => void;
  handleChangeFilters: (value: Record<string, string> | null) => void;
}

export const BuildScreenContextProvider: React.FC = ({ children }) => {
  const [selectedBuilder, setSelectedBuilder] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string> | null>(null);

  const handleSelectBuilder = (panel: string) => {
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
        filters,
        handleChangeFilters,
      }}
    >
      {children}
    </BuildScreenContext.Provider>
  );
};
