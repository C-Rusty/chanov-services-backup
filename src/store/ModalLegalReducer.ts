import { createSlice } from "@reduxjs/toolkit";

export type ModalLegalType = { isOpen: boolean };

const initialState: ModalLegalType = { isOpen: false };

export const ModalLegalReducer = createSlice({
    name: `modal-legal`,
    initialState, 
    reducers: {
        setModalState: (state, action) => {
            state.isOpen = action.payload
        },
    }
});

export const { setModalState } = ModalLegalReducer.actions;

export default ModalLegalReducer.reducer;