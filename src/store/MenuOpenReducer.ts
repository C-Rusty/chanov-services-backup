import { createSlice } from "@reduxjs/toolkit";

export type MenuState = {isOpened: boolean};

const initialState: MenuState = {isOpened: false};

export const MenuStateReducer = createSlice({
    name: `menu`,
    initialState,
    reducers: {
        setMobileState: (state, action) => {
            state.isOpened = action.payload;
        },
    }
});

export const { setMobileState } = MenuStateReducer.actions;

export default MenuStateReducer.reducer;