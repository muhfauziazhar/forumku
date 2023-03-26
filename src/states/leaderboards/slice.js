import leaderboardAPI from './api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isError: false,
    data: [],
};

export const asyncGetAllLeaderboards = createAsyncThunk(
    'leaderboards/getAllLeaderboards',
    async () => {
        const response = await leaderboardAPI.getAllLeaderboards();
        return response;
    }
);

export const leaderboardSlice = createSlice({
    name: 'leaderboards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllLeaderboards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncGetAllLeaderboards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data.leaderboards;
            })
            .addCase(asyncGetAllLeaderboards.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const selectLeaderboard = (state) => state.leaderboards;
