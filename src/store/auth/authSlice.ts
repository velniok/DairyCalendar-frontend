import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { type ILoginParams, type IRegisterParams, type IUser, type IUserRes } from "../../types/userTypes";

export const fetchAuthRegister = createAsyncThunk<IUserRes, IRegisterParams>('auth/fetchAuthRegister', async (params) => {
    const { data } = await axios.post<IUserRes>('/auth/register', params)
    return data
})

export const fetchAuthLogin = createAsyncThunk<IUserRes, ILoginParams>('auth/fetchAuthLogin', async (params) => {
    const { data } = await axios.post<IUserRes>('/auth/login', params)
    return data
})

export const fetchAuthMe = createAsyncThunk<IUserRes>('auth/fetchAuthMe', async () => {
    const { data } = await axios.get<IUserRes>('/auth/me')
    return data
})

interface IUserState {
    data: IUser | null,
    status: string
}

const initialState: IUserState = {
    data: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'logout'
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAuthRegister.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        .addCase(fetchAuthRegister.fulfilled, (state, action: PayloadAction<IUserRes>) => {
            state.data = action.payload.user
            state.status = 'loaded'
        })
        .addCase(fetchAuthRegister.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })

        .addCase(fetchAuthLogin.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        .addCase(fetchAuthLogin.fulfilled, (state, action: PayloadAction<IUserRes>) => {
            state.data = action.payload.user
            state.status = 'loaded'
        })
        .addCase(fetchAuthLogin.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })

        .addCase(fetchAuthMe.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<IUserRes>) => {
            state.data = action.payload.user
            state.status = 'loaded'
        })
        .addCase(fetchAuthMe.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })
    }
})

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions