import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "./event/eventSlice";
import { authReducer } from "./auth/authSlice";
import { userReducer } from "./user/userSlice";
import { searchUsersReducer } from "./searchUsers/searchUsersSlice";

const store = configureStore({
    reducer: {
        event: eventReducer,
        auth: authReducer,
        user: userReducer,
        searchUsers: searchUsersReducer,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store