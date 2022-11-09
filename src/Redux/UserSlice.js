import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    fname: "",
    lname: "",
    email: "",
  },
  reducers: {
    update: (state, action) => {
      state.userId = action.payload.userId;
      state.lname = action.payload.lname;
      state.fname = action.payload.fname;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;

