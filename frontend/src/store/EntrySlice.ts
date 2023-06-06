import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type file_t = {
    name: string
    path: string
    type: "file"
    size: number
    mimetype: string
}
export type folder_t = {
    name: string
    path: string
    type: "folder"
}
export type entry_t = file_t | folder_t


const entries = [
    {name: 'DanilServer', type: "folder"} as folder_t,
    {name: 'Загрузки', type: "folder"} as folder_t,
    {name: 'ConsoleApp2.tar.xz', type: "file"} as file_t,
    {name: 'DanilServer.zip', type: "file"} as file_t
] as entry_t[]

export interface EntryState {
    path: string
}
const initialState: EntryState = {
    path: ""
}

export const entrySlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        resolve: (state, action: PayloadAction<string>) => {
            if(state.path === "")
                state.path = action.payload
            else
                state.path = state.path + '/' + action.payload
        },
        stepUp: (state) => {
            if(state.path === "")
                return
            state.path = state.path.substring(0, state.path.lastIndexOf('/'))
            // console.log(state.path)
        }
    }
})

const {actions, reducer} = entrySlice;
export const {resolve, stepUp} = actions;
export default reducer;