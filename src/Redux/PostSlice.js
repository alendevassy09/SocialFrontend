import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
  },
  reducers: {
    postUpdate: (state, action) => {
      state.post = action.payload.post;
    },
    postAdd:(state,action)=>{
      state.post.unshift(action.payload.post)
    }
  },
});



export const { postUpdate,postAdd } = postSlice.actions;
export default postSlice.reducer;
