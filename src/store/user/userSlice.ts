import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { type IUser } from "../../types/userTypes";

export const fetchGetUser = createAsyncThunk<IUser, { id: string }>('user/fetchGetUser', async (params) => {
    const { data } = await axios.get<IUser>(`/user/get/${params.id}`)
    return data
})

export const fetchEditUser = createAsyncThunk<IUser, { userId: string, req: { username: string } }>('user/fetchEditUser', async (params) => {
    const { data } = await axios.patch<IUser>(`/user/edit/${params.userId}`, params.req)
    return data
})

interface IUserState {
    data: IUser | null
    status: string
} 

const initialState: IUserState = {
    data: null,
    status: 'loading'
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchGetUser.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        .addCase(fetchGetUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.data = action.payload
            state.status = 'loaded'
        })
        .addCase(fetchGetUser.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })

        .addCase(fetchEditUser.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        .addCase(fetchEditUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.data = action.payload
            state.status = 'loaded'
        })
        .addCase(fetchEditUser.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })
    }
})

export const userReducer = userSlice.reducer