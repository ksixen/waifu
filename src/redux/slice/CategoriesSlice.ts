import { createSlice } from "@reduxjs/toolkit";
interface ICategoriesSlice{
  currentCategory: string;
  showNSFW: boolean,
}

const initialState: ICategoriesSlice = {
  currentCategory: "sfw/waifu",
  showNSFW: false,
}

const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {

  },
});

export const categories = CategoriesSlice.reducer;
export const {
} = CategoriesSlice.actions;
