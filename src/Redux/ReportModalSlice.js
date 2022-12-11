import { createSlice } from "@reduxjs/toolkit";


const ReportModalSlice = createSlice({
  name: "reportModal",
  initialState: {
    open: false,
  },
  reducers: {
    openUpdate: (state, action) => {
      console.log(action.payload.open);
      state.open = action.payload.open;
    }
  },
});



export const { openUpdate } = ReportModalSlice.actions;
export default ReportModalSlice.reducer;
