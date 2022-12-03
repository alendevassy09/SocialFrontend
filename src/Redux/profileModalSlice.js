import { createSlice } from "@reduxjs/toolkit";


const profileModalSlice = createSlice({
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



export const { openUpdate } = profileModalSlice.actions;
export default profileModalSlice.reducer;
