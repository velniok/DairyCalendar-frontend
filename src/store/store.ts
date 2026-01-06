import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "./event/eventSlice";
import { authReducer } from "./auth/authSlice";

const store = configureStore({
    reducer: {
        event: eventReducer,
        auth: authReducer,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store