import { createSlice } from "@reduxjs/toolkit";

export type TypeTag = {chosen: `All` | `Articles` | `Cases`};

const initialState: TypeTag = {chosen: `All`};

export const typeTagReducer = createSlice({
    name: `TypeTag`,
    initialState,
    reducers: {
        setTypeTagReducer: (state, action) => {
            state.chosen = action.payload
        }
    },
});

export const { setTypeTagReducer } = typeTagReducer.actions;

export default typeTagReducer.reducer;