import { combineReducers } from "@reduxjs/toolkit";
import { categories, } from "../slice";
import imageListReducer from "../slice/ImagesListSlice";


const rootReducer = combineReducers({
  category: categories,
  imagesList: imageListReducer
});

export default rootReducer;