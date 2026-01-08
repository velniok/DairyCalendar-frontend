import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { type IUser } from "../../types/userTypes";

export const fetchSearchUsers = createAsyncThunk<IUser[], { value: string }>('user/fetchSearchUsers', async (params) => {
    const { data } = await axios.post<IUser[]>(`/user/search/`, params)
    return data
})

interface ISearchUsersState {
    data: IUser[] | null
    status: string
} 

const initialState: ISearchUsersState = {
    data: null,
    status: 'loading'
}

const searchUsersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchUsers.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        .addCase(fetchSearchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            state.data = action.payload
            state.status = 'loaded'
        })
        .addCase(fetchSearchUsers.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })
    }
})

export const searchUsersReducer = searchUsersSlice.reducer