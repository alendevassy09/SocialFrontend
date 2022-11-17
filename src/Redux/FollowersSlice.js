import { createSlice } from "@reduxjs/toolkit";


const FollowersSlice = createSlice({
  name: "Following",
  initialState: {
    Followers: [],
  },
  reducers: {
    FollowersUpdate: (state, action) => {
      state.Followers = action.payload.Followers;
    },
    FollowersAdd:(state,action)=>{
      state.post.unshift(action.payload.Followers)
    }
  },
});



export const { FollowersUpdate,FollowersAdd  } = FollowersSlice.actions;
export default FollowersSlice.reducer;
