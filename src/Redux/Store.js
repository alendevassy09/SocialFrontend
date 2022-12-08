
import { configureStore } from "@reduxjs/toolkit"
import userReducer from './UserSlice';
import postReducer from './PostSlice';
import FollowerReducer from "./FollowersSlice";
import StorySlice from "./StorySlice";
import StoryModalSlice from "./StoryModalSlice";
import SingleStorySlice from "./SingleStorySlice";
import profileModalSlice from "./profileModalSlice";
import SingleProfileSlice from "./SingleProfileSlice";
import SuggestedSlice from "./SuggestedSlice";
import SavedSlice from "./SavedSlice";
export default configureStore({
    reducer:{
        user:userReducer,
        post:postReducer,
        following:FollowerReducer,
        story:StorySlice,
        open:StoryModalSlice,
        singleStory:SingleStorySlice,
        profileModal:profileModalSlice,
        singleProfile:SingleProfileSlice,
        suggested:SuggestedSlice,
        saved:SavedSlice
    }
})
