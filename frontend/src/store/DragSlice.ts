import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {entry_t} from "./EntrySlice";

export interface DragState {
    entry: entry_t | null
}
const initialState: DragState = {
    entry: null
}

export const dragSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        drag: (state, action: PayloadAction<entry_t>) => {
            state.entry = action.payload
        },
        drop: (state) => {
            state.entry = null
        }
    }
})

const {actions, reducer} = dragSlice;
export const {drag, drop} = actions
export default reducer;