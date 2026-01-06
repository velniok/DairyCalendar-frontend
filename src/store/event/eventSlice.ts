import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from '../../axios'
import type { IEvent, IEventParams } from "../../types/eventTypes";

export const fetchGetEvent = createAsyncThunk<IEvent[], { userId: string }>('event/fetchGetEvent', async (params) => {
    const { data } = await axios.get<IEvent[]>(`/event/get/${params.userId}`)
    return data
})

export const fetchCreateEvent = createAsyncThunk<IEvent, IEventParams>('event/fetchCreateEvent', async (params) => {
    const { data } = await axios.post<IEvent>('/event/create', params)
    return data
})

export const fetchEditEvent = createAsyncThunk<IEvent, { id: string, newEvent: IEventParams }>('event/fetchEditEvent', async (params) => {
    const { data } = await axios.patch<IEvent>(`/event/edit/${params.id}`, params.newEvent)
    return data
})

export const fetchRemoveEvent = createAsyncThunk('event/fetchRemoveEvent', async (params: { id: string }) => {
    const { data } = await axios.delete(`/event/delete/${params.id}`)
    return data
})

interface IEventState {
    data: IEvent[] | null
    status: string
}

const initialState: IEventState = {
    data: null,
    status: 'loading',
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchGetEvent.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        .addCase(fetchGetEvent.fulfilled, (state, action: PayloadAction<IEvent[]>) => {
            state.data = action.payload
            state.status = 'loaded'
        })
        .addCase(fetchGetEvent.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })

        .addCase(fetchCreateEvent.pending, (state) => {
            state.data = state.data
            state.status = 'loading'
        })
        .addCase(fetchCreateEvent.fulfilled, (state, action: PayloadAction<IEvent>) => {
            state.data?.push(action.payload)
            state.status = 'loaded'
        })
        .addCase(fetchCreateEvent.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })

        .addCase(fetchEditEvent.pending, (state) => {
            state.data = state.data
            state.status = 'loading'
        })
        .addCase(fetchEditEvent.fulfilled, (state, action: PayloadAction<IEvent>) => {
            if (state.data) {
                state.data = state.data.map(obj => obj._id === action.payload._id ? obj = action.payload : obj = obj)
            }
            state.status = 'loaded'
        })
        .addCase(fetchEditEvent.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })

        .addCase(fetchRemoveEvent.pending, (state) => {
            state.data = state.data
            state.status = 'loading'
        })
        .addCase(fetchRemoveEvent.fulfilled, (state, action) => {
            if (state.data) {
                state.data = state.data.filter(obj => obj._id !== action.meta.arg.id)
            }
            state.status = 'loaded'
        })
        .addCase(fetchRemoveEvent.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })
    }
})

export const eventReducer = eventSlice.reducer