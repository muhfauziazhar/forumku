import { configureStore } from '@reduxjs/toolkit';
import { leaderboardSlice } from './leaderboards/slice';
import { threadSlice } from './threads/slice';
import { userSlice } from './users/slice';

const store = configureStore({
  reducer: {
    threads: threadSlice.reducer,
    users: userSlice.reducer,
    leaderboards: leaderboardSlice.reducer,
  },
});

export default store;
