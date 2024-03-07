import { createSlice } from "@reduxjs/toolkit";

export type FormSendType = {isSent: `ok` | `error` | `not-send`};

const initialState: FormSendType = { isSent: `not-send` };

export const FormSendReducer = createSlice({
    name: "form-sent",
    initialState,
    reducers: {
        setFormSentStatus: (state, action) => {
            state.isSent = action.payload
        }
    }
});

export const { setFormSentStatus } = FormSendReducer.actions;

export default FormSendReducer.reducer;