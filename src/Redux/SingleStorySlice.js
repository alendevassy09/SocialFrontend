import { createSlice } from "@reduxjs/toolkit";


const singleStorySlice = createSlice({
  name: "singleStory",
  initialState: {
    singleStory: {}
  },
  reducers: {
    singleStoryUpdate: (state, action) => {
      state.singleStory = action.payload.singleStory;
    },
  },
});



export const { singleStoryUpdate } = singleStorySlice.actions;
export default singleStorySlice.reducer;
