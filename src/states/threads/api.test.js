import threadsAPI from './api';

describe('Thread API Test', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  test('Get All Threads', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
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
          }),
      })
    );
    const res = await threadsAPI.getAllThreads();
    expect(res.data.threads).toBeDefined();
  });

  test('Get Detail Thread', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
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
          }),
      })
    );
    const res = await threadsAPI.getDetailThread('thread-1');
    expect(res.data.detailThread).toBeDefined();
  });

  test('Create Thread', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
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
          }),
      })
    );
    const res = await threadsAPI.postThread({
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
    });
    expect(res.data.thread).toBeDefined();
  });

  test('Create Comment', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
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
          }),
      })
    );
    const res = await threadsAPI.postComment({
      threadId: 'comment-1',
      content: 'Ini adalah komentar pertama',
    });
    expect(res.data.comment).toBeDefined();
  });
});
