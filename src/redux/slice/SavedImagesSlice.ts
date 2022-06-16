import { createSlice } from "@reduxjs/toolkit";

interface ISavedImages{
  id: number,
  url: string
}
const initialState: ISavedImages[] = []

const SavedImages = createSlice({
  name: "savedImages",
  initialState,
  reducers: {
    addToSaved(state, action){
      const payload = action.payload;
      const newArr = Array.from(state);
      newArr.push(payload);
      state = newArr;
    },
    removeFromSaved(state, action) {
      const payload = action.payload as ISavedImages;
      const findImage = state.find((s) => s.id === payload.id);
      if(findImage){
        const findIndexImage = state.findIndex((s) => s.id === payload.id);
        state.splice(findIndexImage, 1)
      }
    }
  },
});

export const savedImages = SavedImages.reducer;
export const {
  addToSaved,
  removeFromSaved
} = SavedImages.actions;
