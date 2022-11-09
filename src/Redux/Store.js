
import { configureStore } from "@reduxjs/toolkit"
import userReducer from './UserSlice';
import postReducer from './PostSlice'
export default configureStore({
    reducer:{
        user:userReducer,
        post:postReducer
    }
})
