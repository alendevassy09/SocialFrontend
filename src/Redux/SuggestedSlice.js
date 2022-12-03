import { createSlice } from "@reduxjs/toolkit";
const SuggestedsSlice = createSlice({
  name: "suggested",
  initialState: {
    suggested: [],
  },
  reducers: {
    suggestedUpdate: (state, action) => {
      state.suggested = action.payload.suggested;
    },
    suggestedAdd:(state,action)=>{
      state.post.unshift(action.payload.Followers)
    },
    suggesteddelete:(state,action)=>{
      let id=action.payload.id
      for (let i = 0; i < state.suggested.length; i++) {
      if(state.suggested[i].user._id===id){
        state.suggested.pop()
        
      }
        
      }
      state.suggested=action.payload.delete
    }
  },
});



export const { suggestedUpdate,suggestedAdd,suggesteddelete} = SuggestedsSlice.actions;
export default SuggestedsSlice.reducer;
