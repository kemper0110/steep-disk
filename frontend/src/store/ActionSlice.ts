import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {entry_t} from "./EntrySlice";


export interface ActionState {
    entry: entry_t | null
    // opened: boolean
}

const initialState: ActionState = {
    entry: null,
    // opened: false
}

export const actionSlice = createSlice({
    name: "action",
    initialState,
    reducers: {
        open: (state, action: PayloadAction<entry_t>) => {
            state.entry = action.payload
        },
        close: (state) => {
            state.entry = null
        }
    }
})

const {actions, reducer} = actionSlice
export const {open: actionOpen, close: actionClose} = actions
export default reducer