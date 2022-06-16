import { combineReducers } from "@reduxjs/toolkit";
import { categories, savedImages } from "../slice";


const rootReducer = combineReducers({
  category: categories
});

export default rootReducer;