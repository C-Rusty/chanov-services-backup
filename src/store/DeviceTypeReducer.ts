import { createSlice } from "@reduxjs/toolkit";

export type DeviceType = {screen: `desktop` | `mobile`};

const initialState: DeviceType = {screen: window.innerWidth >= 991 ? `desktop` : `mobile`};

export const DeviceTypeReducer = createSlice({
    name: `device`,
    initialState,
    reducers: {
        setDevice: (state, action) => {
            state.screen = action.payload
        }
    }
});

export const { setDevice } = DeviceTypeReducer.actions;

export default DeviceTypeReducer.reducer;