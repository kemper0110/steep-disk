import { configureStore } from '@reduxjs/toolkit'
import entryReducer from "./EntrySlice";
import contextMenuReducer from "./ContextMenuSlice";
import actionReducer from "./ActionSlice";
import dragReducer from "./DragSlice";

export const store = configureStore({
    reducer: {
        entries: entryReducer,
        contextMenu: contextMenuReducer,
        action: actionReducer,
        drag: dragReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch