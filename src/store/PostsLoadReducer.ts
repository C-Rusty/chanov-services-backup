import { createSlice } from "@reduxjs/toolkit";

export type PostsLoadStatus = {isLoaded: boolean};

const initialState: PostsLoadStatus = {isLoaded: false};

export const postsLoadReducer = createSlice({
    name: `postsLoadReducer`,
    initialState,
    reducers: {
        setPostsLoadStatus: (state, action) => {
            state.isLoaded = action.payload
        }
    },
});

export const { setPostsLoadStatus } = postsLoadReducer.actions;

export default postsLoadReducer.reducer;