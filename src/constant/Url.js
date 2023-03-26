export const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const API = {
    // Users
    REGISTER: `${BASE_URL}/register`, // POST
    LOGIN: `${BASE_URL}/login`, // POST
    ALL_USERS: `${BASE_URL}/users`, // GET
    OWN_PROFILE: `${BASE_URL}/users/me`, // GET

    // Threads
    THREAD: `${BASE_URL}/threads`, // GET, POST
    THREAD_DETAIL: `${BASE_URL}/threads/:threadId`, // GET

    // Comments
    COMMENT: `${BASE_URL}/threads/:threadId/comments`, // POST

    // Votes
    UPVOTE_THREAD: `${BASE_URL}/threads/:threadId/up-vote`, // POST
    DOWNVOTE_THREAD: `${BASE_URL}/threads/:threadId/down-vote`, // POST
    NEUTRAL_THREAD: `${BASE_URL}/threads/:threadId/neutral-vote`, // POST
    UPVOTE_COMMENT: `${BASE_URL}/threads/:threadId/comments/:commentId/up-vote`, // POST
    DOWNVOTE_COMMENT: `${BASE_URL}/threads/:threadId/comments/:commentId/down-vote`, // POST
    NEUTRAL_COMMENT: `${BASE_URL}/threads/:threadId/comments/:commentId/neutral-vote`, // POST

    // Leaderboards
    LEADERBOARDS: `${BASE_URL}/leaderboards`, // GET
};

export const URL = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    HOMEPAGE: '/',
    THREAD_POST: '/thread/post',
    THREAD_DETAIL: '/thread/:threadId',
    LEADERBOARDS: '/leaderboards',
    NOT_FOUND: '/not-found',
};
