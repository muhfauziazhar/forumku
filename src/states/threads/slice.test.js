import { configureStore } from '@reduxjs/toolkit';
import store from '../store';
import threadsAPI from './api';
import reducer, {
  asyncGetDetailThread,
  asyncPostThread,
  asyncPostComment,
  filterThreadByCategory,
} from './slice';

describe('Thread States', () => {
  afterAll(() => {
    jest.unmock('./api');
  });

  describe('Reducer test', () => {
    test('Have default value', () => {
      const state = store.getState().threads;
      expect(state).toEqual({
        isLoading: false,
        isError: false,
        data: null,
        detail: null,
      });
    });

    test('getAllThreads, Fulfilled', () => {
      store.dispatch({
        type: 'threads/getAllThreads/fulfilled',
        payload: {
          data: {
            threads: [
              {
                id: 'thread-1',
                title: 'Thread Pertama',
                body: 'Ini adalah thread pertama',
                category: 'General',
                createdAt: '2021-06-21T07:00:00.000Z',
                ownerId: 'users-1',
                upVotesBy: [],
                downVotesBy: [],
                totalComments: 0,
              },
            ],
          },
        },
      });

      const { data, isLoading } = store.getState().threads;
      expect(isLoading).toBeFalsy();
      expect(data).toBeDefined();
    });

    test('postThread, Fulfilled', () => {
      store.dispatch({
        type: 'threads/postThread/fulfilled',
        payload: {
          data: {
            threads: [
              {
                id: 'thread-1',
                title: 'Thread Pertama',
                body: 'Ini adalah thread pertama',
                category: 'General',
                createdAt: '2021-06-21T07:00:00.000Z',
                ownerId: 'users-1',
                upVotesBy: [],
                downVotesBy: [],
                totalComments: 0,
              },
            ],
          },
        },
      });

      const { isLoading } = store.getState().threads;
      expect(isLoading).toBeFalsy();
    });

    test('filterThreadByCategory', () => {
      const prevState = {
        data: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      };
      reducer(
        prevState,
        filterThreadByCategory({
          data: [
            {
              id: 'thread-1',
              title: 'Thread Pertama',
              body: 'Ini adalah thread pertama',
              category: 'General',
              createdAt: '2021-06-21T07:00:00.000Z',
              ownerId: 'users-1',
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        }),
      );
      const { data } = store.getState().threads;
      expect(data).not.toBe(null);
    });
  });

  describe('Thunk test', () => {
    test('Thunk asyncGetDetailThread', async () => {
      threadsAPI.asyncGetDetailThread = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          detailThread: {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Ini adalah komentar pertama',
                createdAt: '2021-06-21T07:00:00.000Z',
                owner: {
                  id: 'users-1',
                  name: 'John Doe',
                  avatar: 'https://generated-image-url.jpg',
                },
                upVotesBy: [],
                downVotesBy: [],
              },
            ],
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'threads/getDetailThread/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(asyncGetDetailThread('thread-1'));
      expect(threadsAPI.asyncGetDetailThread).toBeDefined();
    });

    test('Thunk asyncPostThread', async () => {
      threadsAPI.asyncPostThread = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          thread: {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'threads/postThread/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(
        asyncPostThread({
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
        }),
      );
      expect(threadsAPI.asyncPostThread).toBeDefined();
    });

    test('Thunk asyncPostComment', async () => {
      threadsAPI.asyncPostComment = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          comment: {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            upVotesBy: [],
            downVotesBy: [],
            owner: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
            },
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'threads/postComment/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(
        asyncPostComment({
          threadId: 'comment-1',
          content: 'Ini adalah komentar pertama',
        }),
      );
      expect(threadsAPI.asyncPostComment).toBeDefined();
    });
  });
});
