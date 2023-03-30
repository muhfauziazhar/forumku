/* eslint no-underscore-dangle: 0 */
import threadsAPI from './api';
import reducer, {
  asyncGetAllThreads,
  asyncGetDetailThread,
  asyncPostComment,
} from './slice';
import store from '../store';

describe('Thread States', () => {
  let api;

  beforeAll(() => {
    api = threadsAPI;
  });

  afterAll(() => {
    jest.unmock('./api');
  });

  describe('Thread Reducer Test', () => {
    const initialState = {
      isLoading: false,
      isError: false,
      data: null,
      detail: null,
      filtered: null,
    };

    it('should return the initial state', () => {
      expect(reducer(undefined, { type: undefined })).toEqual({
        isLoading: false,
        isError: false,
        data: null,
        detail: null,
        filtered: null,
      });
    });

    it('sets isLoading when asyncGetAllThreads is pending', () => {
      const action = { type: asyncGetAllThreads.pending.type };
      const { isLoading } = reducer(initialState, action);
      expect(isLoading).toBeTruthy();
    });

    it('sets isLoading and data when asyncGetAllThreads is fulfilled', () => {
      const fakeResponse = [
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
      ];
      const action = {
        type: asyncGetAllThreads.fulfilled.type,
        payload: {
          data: {
            threads: fakeResponse,
          },
        },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isLoading: false,
        detail: null,
        filtered: null,
        isError: false,
        data: fakeResponse,
      });
    });

    it('sets the detail when asyncGetDetailThread is fulfilled', () => {
      const fakeResponse = {
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
      };
      const action = {
        type: asyncGetDetailThread.fulfilled.type,
        payload: {
          data: {
            detailThread: fakeResponse,
          },
        },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isLoading: false,
        isError: false,
        data: null,
        detail: fakeResponse,
        filtered: null,
      });
    });

    it('sets the detail when asyncPostComment is fulfilled', () => {
      const fakeResponse = {
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
      };
      const actionGetDetail = {
        type: asyncGetDetailThread.fulfilled.type,
        payload: {
          data: {
            detailThread: fakeResponse,
          },
        },
      };
      const stateGetDetail = reducer(initialState, actionGetDetail);

      const fakeComment = {
        id: 'comment-2',
        content: 'Ini adalah komentar kedua',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
        },
      };

      const actionPostComment = {
        type: asyncPostComment.fulfilled.type,
        payload: {
          data: { comment: fakeComment },
        },
      };
      const statePostComment = reducer(stateGetDetail, actionPostComment);

      expect(statePostComment).toEqual({
        isLoading: false,
        isError: false,
        data: null,
        detail: {
          ...fakeResponse,
          comments: [fakeComment, ...fakeResponse.comments],
        },
        filtered: null,
      });
    });
  });

  describe('Thunk Test', () => {
    const { dispatch, getState } = store;

    beforeEach(() => {
      api._getAllThreads = api.getAllThreads;
      api._getDetailThread = api.getDetailThread;
      api._postComment = api.postComment;
    });

    afterEach(() => {
      api.getAllThreads = api._getAllThread;
      api.getDetailThread = api._getDetailThread;
      api.postComment = api._postComment;

      delete api._getAllThreads;
      delete api._getDetailThreads;
      delete api._postComment;
    });

    it('asyncGetAllThreads thunk', async () => {
      const fakeResponse = [
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
      ];
      api.getAllThreads = () => Promise.resolve({ data: { threads: fakeResponse } });

      await dispatch(asyncGetAllThreads());

      expect(getState().threads.data).toEqual(fakeResponse);
    });

    it('asyncGetDetailThread thunk', async () => {
      const fakeResponse = {
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
      };

      api.getDetailThread = () => Promise.resolve({ data: { detailThread: fakeResponse } });

      await dispatch(asyncGetDetailThread({ threadId: fakeResponse.id }));

      expect(getState().threads.detail).toEqual(fakeResponse);
    });

    it('asyncPostComment thunk', async () => {
      const fakeResponse = {
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
      };

      const fakeComment = {
        id: 'comment-2',
        content: 'Ini adalah komentar kedua',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
        },
      };

      api.postComment = () => Promise.resolve({ data: { comment: fakeComment } });

      await dispatch(
        asyncPostComment({
          threadId: fakeResponse.id,
          content: fakeComment.content,
        }),
      );

      expect(getState().threads.detail).toEqual({
        ...fakeResponse,
        comments: [fakeComment, ...fakeResponse.comments],
      });
    });
  });
});
