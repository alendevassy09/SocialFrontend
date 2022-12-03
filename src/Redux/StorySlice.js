import { createSlice } from "@reduxjs/toolkit";


const storySlice = createSlice({
  name: "story",
  initialState: {
    story: []
  },
  reducers: {
    storyUpdate: (state, action) => {
      state.story = action.payload.story;
    },
    
    storyAdd:(state,action)=>{
      state.story.unshift(action.payload.story)
    }
  },
});



export const { storyUpdate,storyAdd } = storySlice.actions;
export default storySlice.reducer;
