import { createSlice } from "@reduxjs/toolkit";


const singleProfileSlice = createSlice({
  name: "singleProfile",
  initialState: {
    singleProfile: {}
  },
  reducers: {
    singleProfileUpdate: (state, action) => {
      state.singleProfile = action.payload.singleProfile;
    },
  },
});



export const { singleProfileUpdate } = singleProfileSlice.actions;
export default singleProfileSlice.reducer;
