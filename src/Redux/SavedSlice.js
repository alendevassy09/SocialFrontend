import { createSlice } from "@reduxjs/toolkit";
import axios from '../Axios/axios'
const token = localStorage.getItem("userToken");
const savedSlice = createSlice({
  name: "saved",
  initialState: {
    saved: [],
  },
  reducers: {
    savedUpdate: (state, action) => {
      state.saved = action.payload.saved
    },
    savedAdd:(state,action)=>{
      state.saved.unshift(action.payload.post)
    },
    saveRemove:(state,action)=>{
    //  let id = action.payload.id
    //  state.saved=state.saved.filter((obj)=>{
    //   if(obj._id!=id){
    //     return obj
    //   }
    //  })
    state.saved.splice(1,1-1)
    // let array
    // for (let index = 0; index <state.saved.length; index++) {
    //   if(state.saved[index]._id==action.payload.id){
    //    state.saved.splice(index,index-1)
    //     break;
    //   }
      
    // }
    },
    getSaved:(state,action)=>{
      axios.get('/getsaved',{headers:{token}}).then((response)=>{
        console.log(response.data.posts);
       state.saved= response.data.posts
      })
    }
  },
});



export const { savedUpdate,savedAdd,getSaved,saveRemove } = savedSlice.actions;
export default savedSlice.reducer;
