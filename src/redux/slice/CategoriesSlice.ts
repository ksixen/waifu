import { createSlice } from "@reduxjs/toolkit";
interface ICategoriesSlice {
  currentCategory: string;
  showNSFW: boolean;
}

const initialState: ICategoriesSlice = {
  currentCategory: "sfw/waifu",
  showNSFW: false,
};

const state = {};

const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
});

export const categories = CategoriesSlice.reducer;
export const {
  changeCategory
} = CategoriesSlice.actions;
