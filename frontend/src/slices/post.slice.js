

import { createSlice } from "@reduxjs/toolkit";

const postSlice =  createSlice({
    name:"post",
    initialState:{
        likingPosts:localStorage.getItem("likings") || []
    },
    reducers:{
        likingPost:(action,state)=>{
            state.likingPosts.push(action);
        },
        unlikingPost:(action,state)=>{
            state.likingPosts = state.likingPosts.filter(post=>post._id!==action._id)
        }
    }
})

export const {likingPost,unlikingPost} = postSlice.actions;

export default postSlice.reducer;