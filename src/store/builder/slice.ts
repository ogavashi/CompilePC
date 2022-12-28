import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Part, Assembly, Builder, CategoryName } from '../../../types/index';
import { ProductCategories } from '../../common/constants';

export interface BuilderState {
  builders: Builder[];
  openedBuilder: CategoryName | null;
  assembly: Assembly;
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
    addAssemblyPart: (
      state,
      action: PayloadAction<{ part: Part; category: CategoryName }>,
    ) => {
      state.assembly = {
        ...state.assembly,
        [action.payload.category]: action.payload.part,
      };
      state.openedBuilder = null;
    },
    removeAssemblyPart: (state, action: PayloadAction<CategoryName>) => {
      state.assembly = {
        ...state.assembly,
        [action.payload]: null,
      };
    },
    eraseAssembly: (state) => {
      state.assembly = emptyAssembly;
    },
  },
});

export const {
  openBuilder,
  addAssemblyPart,
  removeAssemblyPart,
  eraseAssembly,
} = builderSlice.actions;

export default builderSlice.reducer;
