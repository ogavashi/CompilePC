import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Part,
  Assembly,
  Builder,
  CategoryName,
  SelectedFilter,
} from '../../../types/index';
import { BuilderMode, ProductCategories } from '../../common/constants';

export interface BuilderState {
  builders: Builder[];
  openedBuilder: CategoryName | null;
  assembly: Assembly;
  mode: BuilderMode;
  updateAssemblyId: string | null;
  assemblyTitle: string | null;
}

const builders: Builder[] = Object.values(ProductCategories).map(
  (category) => ({
    ...category,
    filter: {},
  }),
);

const emptyAssembly = {
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

const initialState: BuilderState = {
  builders,
  openedBuilder: null,
  assembly: emptyAssembly,
  mode: BuilderMode.NEW,
  updateAssemblyId: null,
  assemblyTitle: null,
};

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    openBuilder: (state, action: PayloadAction<CategoryName>) => {
      if (state.openedBuilder === action.payload) {
        state.openedBuilder = null;
        return;
      }
      state.openedBuilder = action.payload;
    },
    setFilter: (
      state,
      action: PayloadAction<{ category: CategoryName; filter: SelectedFilter }>,
    ) => {
      const { category, filter } = action.payload;
      state.builders = state.builders.map((builder) =>
        builder.categoryName === category ? { ...builder, filter } : builder,
      );
    },
    setSearch: (
      state,
      action: PayloadAction<{ category: CategoryName; value: string }>,
    ) => {
      const { category, value } = action.payload;

      state.builders = state.builders.map((builder) => {
        if (!value) {
          // Remove empty search filter
          const { searchValue, ...filters } = builder.filter;
          return { ...builder, filter: { ...filters } };
        }
        return builder.categoryName === category
          ? { ...builder, filter: { ...builder.filter, searchValue: value } }
          : builder;
      });
    },
    addAssemblyPart: (
      state,
      action: PayloadAction<{ part: Part; category: CategoryName }>,
    ) => {
      state.assembly = {
        ...state.assembly,
        [action.payload.category]: action.payload.part,
      };
    },
    setAssembly: (state, action: PayloadAction<Assembly>) => {
      state.assembly = action.payload;
    },
    setMode: (
      state,
      action: PayloadAction<{
        builderMode: BuilderMode;
        id: string | null;
        assemblyTitle: string | null;
      }>,
    ) => {
      state.mode = action.payload.builderMode;
      state.updateAssemblyId = action.payload.id;
      state.assemblyTitle = action.payload.assemblyTitle;
    },
    removeAssemblyPart: (state, action: PayloadAction<CategoryName>) => {
      state.assembly = {
        ...state.assembly,
        [action.payload]: null,
      };
    },
    eraseAssembly: (state) => {
      state.assembly = emptyAssembly;
      state.openedBuilder = null;
    },
  },
});

export const {
  openBuilder,
  setFilter,
  setSearch,
  addAssemblyPart,
  removeAssemblyPart,
  eraseAssembly,
  setAssembly,
  setMode,
} = builderSlice.actions;

export default builderSlice.reducer;
