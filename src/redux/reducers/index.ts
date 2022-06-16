import { combineReducers } from "@reduxjs/toolkit";
import { categories, savedImages } from "../slice";


const rootReducer = combineReducers({
  savedImages: savedImages,
  category: categories
});

export default rootReducer;