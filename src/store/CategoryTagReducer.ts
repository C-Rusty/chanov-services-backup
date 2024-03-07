import { createSlice } from "@reduxjs/toolkit";

export type CategoryTag = {chosen: `All` | `Marketing` | `Strategy`};

const initialState: CategoryTag = {chosen : `All`};

export const categoryTagReducer = createSlice({
    name: `CategoryTag`,
    initialState,
    reducers: {
        setCategoryTagReducer: (state, action) => {
            state.chosen = action.payload
        }
    },
});

export const { setCategoryTagReducer } = categoryTagReducer.actions;

export default categoryTagReducer.reducer;