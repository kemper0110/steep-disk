import { configureStore } from '@reduxjs/toolkit'
import entryReducer from "./EntrySlice";

export const store = configureStore({
    reducer: {
        entries: entryReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch