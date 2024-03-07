import { createSlice } from "@reduxjs/toolkit";

export type MenuPosition = {top: string};

const initialState: MenuPosition = {top: `-95vh`};

export const MobilePositionReducer = createSlice({
    name: `menuPositioning`,
    initialState,
    reducers: { 
        hideMobileMenu: (state, action) => {
            const scrollY: number = action.payload.scrollY;
            const windowHeight: number = action.payload.windowHeight;
            const headerHeight: number = action.payload.headerHeight;
            const menu: HTMLDivElement = action.payload.menu;

            state.top = scrollY - windowHeight + headerHeight + `px`;

            menu.style.top = state.top;
        },
        showMobileMenu: (state, action) => {
            const scrollY = action.payload.scrollY;
            const headerHeight = action.payload.headerHeight;
            const menu: HTMLDivElement = action.payload.menu;

            state.top = scrollY + headerHeight + `px`;

            menu.style.top = state.top;
        }
    }
});

export const { hideMobileMenu, showMobileMenu } = MobilePositionReducer.actions;

export default MobilePositionReducer.reducer;