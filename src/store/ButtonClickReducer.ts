import { createSlice } from "@reduxjs/toolkit";

export type ButtonClicked = {button: `mobileMenu` | `mobileFilters` | `none`};

const initialState: ButtonClicked = {button: `none`};

export const buttonClickReducer = createSlice({
    name: `buttonClicked`,
    initialState,
    reducers: {
        setButton: (state, action) => {
            state.button = action.payload;
        }
    }
});

export const {setButton} = buttonClickReducer.actions;

export default buttonClickReducer.reducer;