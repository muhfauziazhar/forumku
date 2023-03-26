import usersAPI from './api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    token: null,
    isLogin: false,
    status: null,
};

export const asyncLogin = createAsyncThunk(
    'users/login',
    async ({ email, password }) => {
        const response = await usersAPI.login({ email, password });
        return response;
    }
);

export const asyncRegister = createAsyncThunk(
    'users/register',
    async ({ name, email, password }) => {
        const response = await usersAPI.register({ name, email, password });
        return response;
    }
);

export const asyncGetAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async () => {
        const response = await usersAPI.getAllUsers();
        return response;
    }
);

export const asyncGetOwnProfile = createAsyncThunk(
    'users/getOwnProfile',
    async () => {
        const response = await usersAPI.getOwnProfile();
        return response;
    }
);

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        unSetAuthUser: (state) => {
            state.isLogin = false;
            state.token = null;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.data.token;
                state.isLogin = true;
                state.status = action.payload.status;
                state.message = action.payload.message;
            })
            .addCase(asyncLogin.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status;
                state.message = action.payload.message;
                state.isRegister = true;
            })
            .addCase(asyncRegister.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isRegister = false;
            })
            .addCase(asyncGetAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncGetAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data.users;
            })
            .addCase(asyncGetAllUsers.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncGetOwnProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncGetOwnProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ownProfile = action.payload.data.user;
            })
            .addCase(asyncGetOwnProfile.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const selectUser = (state) => state.users;

export const { unSetAuthUser, setAuthUser } = userSlice.actions;
