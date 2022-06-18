import { createSlice } from "@reduxjs/toolkit";
import { IImage } from "src/pages/index";

interface IImageListSlice {
  mainPageList: IImage[];
  savedImages: IImage[];
}

const initialState: IImageListSlice = {
  mainPageList: [],
  savedImages: [],
};

const ImageListSlice = createSlice({
  name: "imagesList",
  initialState,
  reducers: {
    addToMainPageList(state, action){
      state.mainPageList.push(action.payload)
    },
    clearMainPageList(state){
      state.mainPageList = [];
    },
    addToSaved(state, action) {
      const payload = action.payload;
      const newArr = Array.from(state.savedImages);
      newArr.push(payload);
      state.savedImages = newArr;
    },
    removeFromSaved(state, action) {
      const savedImages = state.savedImages;
      const payload = action.payload;
      const findImage = savedImages.find((s) => s.url === payload.url);
      if (findImage) {
        const findIndexImage = savedImages.findIndex(
          (s) => s.url === payload.url
        );
        savedImages.splice(findIndexImage, 1);
      }
    },
  },
});


const imageListReducer = ImageListSlice.reducer;
export const {addToSaved, removeFromSaved, addToMainPageList, clearMainPageList} = ImageListSlice.actions;
export default imageListReducer;
