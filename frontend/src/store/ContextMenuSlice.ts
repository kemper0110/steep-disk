import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface ContextMenuState {
    posx: number
    posy: number
    opened: boolean
}

const initialState: ContextMenuState = {
    posx: 0,
    posy: 0,
    opened: false
}

export interface MenuOpenPayload {
    posx: number
    posy: number
}

export const contextMenuSlice = createSlice({
    name: "contextMenu",
    initialState,
    reducers: {
        open: (state, action: PayloadAction<MenuOpenPayload>) => {
            state.opened = true
            state.posx = action.payload.posx
            state.posy = action.payload.posy
        },
        close: (state) => {
            state.opened = false
        }
    }
})

const {actions, reducer} = contextMenuSlice
export const {open, close} = actions
export default reducer