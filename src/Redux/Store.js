
import { configureStore } from "@reduxjs/toolkit"
import userReducer from './UserSlice';
import postReducer from './PostSlice';
import FollowerReducer from "./FollowersSlice";
export default configureStore({
    reducer:{
        user:userReducer,
        post:postReducer,
        following:FollowerReducer
    }
})
