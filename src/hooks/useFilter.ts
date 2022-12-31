import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectedFilter } from '../../types';
import { selectFilter, selectOpenedBuilder } from '../store/builder/selectors';
import { setFilter } from '../store/builder/slice';

const useFilter = () => {
  const dispatch = useDispatch();

  const openedBuilder = useSelector(selectOpenedBuilder);

  const savedFilter = useSelector(selectFilter(openedBuilder));

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

  const addRangeFilter = useCallback(
    (value: SelectedFilter) =>
      setSelectedFilters((prev) => ({ ...prev, ...value })),
    [],
  );

  const handleApplyFilters = useCallback(() => {
    if (openedBuilder && selectedFilters) {
      dispatch(
        setFilter({
          category: openedBuilder,
          filter: selectedFilters,
        }),
      );
    }
    setOpenedFilter(null);
  }, [dispatch, openedBuilder, selectedFilters]);

  return {
    selectedFilters,
    addAccordionFilter,
    addSwitchFilter,
    openedFilter,
    setOpenedFilter,
    handleOpenFilter,
    addRangeFilter,
    openedBuilder,
    handleApplyFilters,
  };
};

export default useFilter;
