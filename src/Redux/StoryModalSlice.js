import { createSlice } from "@reduxjs/toolkit";


const storyModalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
  },
  reducers: {
    openUpdate: (state, action) => {
      state.open = action.payload.open;
    }
  },
});



export const { openUpdate } = storyModalSlice.actions;
export default storyModalSlice.reducer;
