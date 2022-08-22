import React, { createContext, useState } from 'react';

export const BuildScreenContext = createContext<BuildScreenProps>(
  {} as BuildScreenProps,
);

interface BuildScreenProps {
  selectedBuilder: string | null;
  selectedFilter: string | null;
  handleSelectBuilder: (value: string) => void;
  handleSelectFilter: (value: string) => void;
}

export const BuildScreenContextProvider: React.FC = ({ children }) => {
  const [selectedBuilder, setSelectedBuilder] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSelectBuilder = (panel: string) => {
    setSelectedBuilder((prev) => (prev === panel ? null : panel));
  };

  const handleSelectFilter = (panel: string) => {
    setSelectedFilter((prev) => (prev === panel ? null : panel));
  };

  return (
    <BuildScreenContext.Provider
      value={{
        selectedBuilder,
        handleSelectBuilder,
        selectedFilter,
        handleSelectFilter,
      }}
    >
      {children}
    </BuildScreenContext.Provider>
  );
};
