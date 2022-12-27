import React, { createContext, useCallback, useState } from 'react';
import useQueryParams from '../../hooks/useQueryParams';
import { Build, CategoryName, Part, ProductCategory } from '../../../types';

const emptyBuild: Build = {
  CPU: null,
  GPU: null,
  PSU: null,
  RAM: null,
  case: null,
  cooling: null,
  motherboard: null,
  SSD: null,
  HDD: null,
};

export const AppContext = createContext<BuildScreenProps>(
  {} as BuildScreenProps,
);

interface BuildScreenProps {
  selectedBuilder: ProductCategory | null;
  selectedFilter: string | null;
  filters: Record<string, string> | null;
  build: Build;
  addPart: (part: Part, category: CategoryName) => void;
  removePart: (category: CategoryName) => void;
  clearBuild: () => void;
  handleSelectBuilder: (value: ProductCategory) => void;
  handleSelectFilter: (value: string) => void;
  handleChangeFilters: (value: Record<string, string> | null) => void;
  setSelectedFilter: (value: string | null) => void;
}

export const AppContextProvider: React.FC = ({ children }) => {
  // TODO: Move selectedBuilder to query string
  const [selectedBuilder, setSelectedBuilder] =
    useState<ProductCategory | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string> | null>(null);
  const [build, setBuild] = useState<Build>(emptyBuild);

  const { setSearchParams } = useQueryParams();

  const handleSelectBuilder = (panel: ProductCategory) => {
    // Erase query string and filters in state whenever new builder is opened
    setSearchParams({});
    setFilters(null);
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

  const addPart = (part: Part, category: CategoryName) => {
    setBuild((prev) => ({ ...prev, [category]: part }));
    setSelectedBuilder(null);
  };

  const removePart = (category: CategoryName) => {
    setBuild((prev) => ({ ...prev, [category]: null }));
  };

  const clearBuild = () => {
    setBuild(emptyBuild);
  };

  return (
    <AppContext.Provider
      value={{
        selectedBuilder,
        handleSelectBuilder,
        selectedFilter,
        handleSelectFilter,
        setSelectedFilter,
        filters,
        handleChangeFilters,
        build,
        addPart,
        removePart,
        clearBuild,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
