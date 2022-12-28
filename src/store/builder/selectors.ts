import { createSelector } from '@reduxjs/toolkit';
import { Assembly, Builder, CategoryName, Part } from '../../../types';
import { RootState } from '../index';

type Selector<S> = (state: RootState) => S;

const selectOpenedBuilder = (state: RootState): CategoryName | null =>
  state.openedBuilder;

const selectBuilders = (state: RootState): Builder[] => state.builders;

const selectAssembly = (state: RootState): Assembly => state.assembly;

const selectAssemblyPart = (category: CategoryName): Selector<Part | null> =>
  createSelector(selectAssembly, (assembly: Assembly) => assembly[category]);

export {
  selectOpenedBuilder,
  selectBuilders,
  selectAssembly,
  selectAssemblyPart,
};
