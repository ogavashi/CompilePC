import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CategoryName, SelectedFilter } from '../../types';
import { selectFilter } from '../store/builder/selectors';

const useFilter = (category: CategoryName | null) => {
  const savedFilter = useSelector(selectFilter(category));

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter | null>(
    savedFilter,
  );

  const [openedFilter, setOpenedFilter] = useState<string | null>(null);

  useEffect(() => {
    setSelectedFilters(savedFilter);
  }, [savedFilter]);

  const handleOpenFilter = (panel: string) => {
    setOpenedFilter((prev) => (prev === panel ? null : panel));
  };

  const addAccordionFilter = useCallback(
    (key: string, value: string) => {
      const updateFilters = () => {
        let updatedFilters;

        if (!selectedFilters) {
          updatedFilters = { [key]: [value] };
          return updatedFilters;
        }

        if (!selectedFilters[key]) {
          updatedFilters = { ...selectedFilters, [key]: [value] };
          return updatedFilters;
        }

        if (selectedFilters[key].includes(value)) {
          updatedFilters = {
            ...selectedFilters,
            [key]: (selectedFilters[key] as string[]).filter(
              (filter) => filter !== value,
            ),
          };
          return updatedFilters;
        }

        updatedFilters = {
          ...selectedFilters,
          [key]: [...(selectedFilters[key] as string[]), value],
        };
        return updatedFilters;
      };

      const updatedFilters = updateFilters();

      const normalizedFilter = Object.fromEntries(
        Object.entries(updatedFilters).filter(([, v]) => v.length),
      );
      setSelectedFilters(normalizedFilter);
    },

    [selectedFilters],
  );

  const addSwitchFilter = useCallback(
    (key: string, value: string) => {
      const updateFilters = () => {
        let updatedFilters;

        if (!selectedFilters) {
          updatedFilters = { [key]: value };
          return updatedFilters;
        }
        if (selectedFilters[key] === value) {
          updatedFilters = { ...selectedFilters, [key]: '' };
          return updatedFilters;
        }

        updatedFilters = { ...selectedFilters, [key]: value };
        return updatedFilters;
      };

      const updatedFilters = updateFilters();

      const normalizedFilter = Object.fromEntries(
        Object.entries(updatedFilters).filter(([, v]) => v),
      );
      setSelectedFilters(normalizedFilter);
    },
    [selectedFilters],
  );

  return {
    selectedFilters,
    setSelectedFilters,
    addAccordionFilter,
    addSwitchFilter,
    openedFilter,
    setOpenedFilter,
    handleOpenFilter,
  };
};

export default useFilter;
