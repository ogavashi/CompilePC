import { createSelector } from '@reduxjs/toolkit';
import {
  SelectedFilter,
  Assembly,
  Builder,
  CategoryName,
  Part,
} from '../../../types/index';
import { RootState } from '../index';

type Selector<S> = (state: RootState) => S;

const selectOpenedBuilder = (state: RootState): CategoryName | null =>
  state.builder.openedBuilder;

const selectBuilders = (state: RootState): Builder[] => state.builder.builders;

const selectBuilder = (
  category: CategoryName | null,
): Selector<Builder | null> =>
  createSelector(
    selectBuilders,
    (builders: Builder[]) =>
      builders.find(({ categoryName }) => categoryName === category) || null,
  );

const selectAssembly = (state: RootState): Assembly => state.builder.assembly;

const selectAssemblyPart = (category: CategoryName): Selector<Part | null> =>
  createSelector(selectAssembly, (assembly: Assembly) => assembly[category]);

const selectFilter = (
  category: CategoryName | null,
): Selector<SelectedFilter | null> =>
  createSelector(selectBuilder(category), (builder) => builder?.filter || null);

export {
  selectOpenedBuilder,
  selectBuilders,
  selectAssembly,
  selectAssemblyPart,
  selectBuilder,
  selectFilter,
};
