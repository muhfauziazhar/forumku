import threadsAPI from './api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    detail: null,
};

export const asyncGetAllThreads = createAsyncThunk(
    'threads/getAllThreads',
    async () => {
        const response = await threadsAPI.getAllThreads();
        return response;
    }
);

export const asyncPostThread = createAsyncThunk(
    'threads/postThread',
    async ({ title, body, category }) => {
        const response = await threadsAPI.postThread({ title, body, category });
        return response;
    }
);

export const asyncGetDetailThread = createAsyncThunk(
    'threads/getDetailThread',
    async ({ threadId }) => {
        const response = await threadsAPI.getDetailThread({ threadId });
        return response;
    }
);

export const asyncPostComment = createAsyncThunk(
    'threads/postComment',
    async ({ threadId, content }) => {
        const response = await threadsAPI.postComment({ threadId, content });
        return response;
    }
);

export const asyncUpVoteThread = createAsyncThunk(
    'threads/upVoteThread',
    async ({ threadId }) => {
        const response = await threadsAPI.upVoteThread({ threadId });
        return response;
    }
);

export const asyncDownVoteThread = createAsyncThunk(
    'threads/downVoteThread',
    async ({ threadId }) => {
        const response = await threadsAPI.downVoteThread({ threadId });
        return response;
    }
);

export const asyncNeutralVoteThread = createAsyncThunk(
    'threads/neutralVoteThread',
    async ({ threadId }) => {
        const response = await threadsAPI.neutralVoteThread({ threadId });
        return response;
    }
);

export const asyncUpVoteComment = createAsyncThunk(
    'threads/upVoteComment',
    async ({ threadId, commentId }) => {
        const response = await threadsAPI.upVoteComment({
            threadId,
            commentId,
        });
        return response;
    }
);

export const asyncDownVoteComment = createAsyncThunk(
    'threads/downVoteComment',
    async ({ threadId, commentId }) => {
        const response = await threadsAPI.downVoteComment({
            threadId,
            commentId,
        });
        return response;
    }
);

export const asyncNeutralVoteComment = createAsyncThunk(
    'threads/neutralVoteComment',
    async ({ threadId, commentId }) => {
        const response = await threadsAPI.neutralVoteComment({
            threadId,
            commentId,
        });
        return response;
    }
);

export const threadSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllThreads.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncGetAllThreads.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data.threads;
            })
            .addCase(asyncGetAllThreads.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncPostThread.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncPostThread.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(asyncPostThread.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncGetDetailThread.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncGetDetailThread.fulfilled, (state, action) => {
                state.isLoading = false;
                state.detail = action.payload.data.detailThread;
            })
            .addCase(asyncGetDetailThread.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncPostComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncPostComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(asyncPostComment.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncUpVoteThread.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncUpVoteThread.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
                state.detail = {
                    ...state.detail,
                    upVotesBy: [
                        action.payload.data.vote.userId,
                        ...state.detail.upVotesBy,
                    ],
                };
            })
            .addCase(asyncUpVoteThread.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncDownVoteThread.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncDownVoteThread.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
                state.detail = {
                    ...state.detail,
                    downVotesBy: [
                        action.payload.data.vote.userId,
                        ...state.detail.downVotesBy,
                    ],
                };
            })
            .addCase(asyncDownVoteThread.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncNeutralVoteThread.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncNeutralVoteThread.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(asyncNeutralVoteThread.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncUpVoteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncUpVoteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(asyncUpVoteComment.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncDownVoteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncDownVoteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(asyncDownVoteComment.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(asyncNeutralVoteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncNeutralVoteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(asyncNeutralVoteComment.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const selectThread = (state) => state.threads;
export const selectDetailThread = (state) => state.threads.detail;
