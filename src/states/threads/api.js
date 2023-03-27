import { API } from '../../constant/Url';

const threadsAPI = {
  getAllThreads: async () => {
    const response = await fetch(API.THREAD);
    const data = await response.json();
    return data;
  },
  postThread: async ({ title, body, category }) => {
    const response = await fetch(API.THREAD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, body, category }),
    });
    const data = await response.json();
    return data;
  },
  getDetailThread: async ({ threadId }) => {
    const response = await fetch(
      API.THREAD_DETAIL.replace(':threadId', threadId),
    );
    const data = await response.json();
    return data;
  },
  postComment: async ({ threadId, content }) => {
    const response = await fetch(
      API.COMMENT.replace(':threadId', threadId),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content }),
      },
    );
    const data = await response.json();
    return data;
  },
  upVoteThread: async ({ threadId }) => {
    const response = await fetch(
      API.UPVOTE_THREAD.replace(':threadId', threadId),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
  downVoteThread: async ({ threadId }) => {
    const response = await fetch(
      API.DOWNVOTE_THREAD.replace(':threadId', threadId),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
  neutralVoteThread: async ({ threadId }) => {
    const response = await fetch(
      API.NEUTRAL_THREAD.replace(':threadId', threadId),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
  upVoteComment: async ({ threadId, commentId }) => {
    const response = await fetch(
      API.UPVOTE_COMMENT.replace(':threadId', threadId).replace(
        ':commentId',
        commentId,
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
  downVoteComment: async ({ threadId, commentId }) => {
    const response = await fetch(
      API.DOWNVOTE_COMMENT.replace(':threadId', threadId).replace(
        ':commentId',
        commentId,
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
  neutralVoteComment: async ({ threadId, commentId }) => {
    const response = await fetch(
      API.NEUTRAL_COMMENT.replace(':threadId', threadId).replace(
        ':commentId',
        commentId,
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
};

export default threadsAPI;
