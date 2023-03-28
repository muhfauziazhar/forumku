import React from 'react';
import {
  Badge, Button, Card, Spinner,
} from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import {
  asyncDownVoteComment,
  asyncDownVoteThread,
  asyncGetDetailThread,
  asyncUpVoteComment,
  asyncUpVoteThread,
  selectDetailThread,
} from '../states/threads/slice';
import { selectUser } from '../states/users/slice';
import { getToken, showFormattedDate } from '../utils/helper';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

function ThreadDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const threadDetail = useSelector(selectDetailThread);
  const token = getToken();

  const upVoteThreadHandler = () => dispatch(asyncUpVoteThread({ threadId: threadDetail.id }));
  const downVoteThreadHandler = () => dispatch(asyncDownVoteThread({ threadId: threadDetail.id }));
  const upVoteCommentHandler = ({ commentId }) => dispatch(asyncUpVoteComment({ threadId: threadDetail.id, commentId }));
  const downVoteCommentHandler = ({ commentId }) => dispatch(asyncDownVoteComment({ threadId: threadDetail.id, commentId }));

  const isVoteByMe = user && user.ownProfile && threadDetail && threadDetail.upVotesBy && threadDetail.upVotesBy.includes(user.ownProfile.id);
  const isDownVoteByMe = user && user.ownProfile && threadDetail && threadDetail.downVotesBy && threadDetail.downVotesBy.includes(user.ownProfile.id);

  React.useEffect(() => {
    if (params.threadId) {
      dispatch(asyncGetDetailThread({ threadId: params.threadId }));
    }
  }, [params, dispatch]);

  return (
    <div>
      {threadDetail ? (
        <div className="max-w-screen-xl">
          <Card>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-row">
                <span className=" bg-blue-200 text-blue-800 text-sm font-medium p-2 rounded dark:bg-blue-900 dark:text-blue-300">{threadDetail.category}</span>
                <h1 className="ml-3 text-2xl font-bold  text-gray-900 dark:text-white">{threadDetail.title}</h1>
              </div>

              <div className="flex flex-row mt-3 md:mt-0">
                <img className="h-8 w-8 rounded-full shadow-lg" src={threadDetail.owner.avatar} alt="Profile" />
                <div className="ml-3">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">{threadDetail.owner.name}</h5>
                  <h6 className="text-xs text-gray-400 dark:text-white">{showFormattedDate(threadDetail.createdAt)}</h6>
                </div>
              </div>
            </div>
            <div>{parse(threadDetail.body)}</div>
            <div className="flex justify-between">
              <div className=" flex flex-row items-center">
                <Button outline={!isVoteByMe} gradientDuoTone="greenToBlue" onClick={() => upVoteThreadHandler()} disabled={isVoteByMe || !user.ownProfile}>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-6 h-6 dark:text-white"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                  </svg>
                </Button>
                <Button
                  outline={!isDownVoteByMe}
                  onClick={() => downVoteThreadHandler()}
                  disabled={isDownVoteByMe || !user.ownProfile}
                  gradientDuoTone="pinkToOrange"
                  className="ml-2"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-6 h-6 dark:text-white"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>
          {token ? (
            <CommentInput />
          ) : (
            <div className="text-xl mt-3 rounded-lg appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
              Login untuk mulai berkomentar
            </div>
          )}

          <div className="flex mt-8">
            <h1 className="text-xl mr-1">Komentar</h1>
            {' '}
            <Badge size="lg">{threadDetail.comments.length}</Badge>
          </div>
          {user
            && threadDetail.comments
            && threadDetail.comments.length > 0
            && threadDetail.comments.map((comment) => (
              <CommentList
                key={`${comment.id}-key`}
                user={user.ownProfile}
                comment={comment}
                upVoteCommentHandler={upVoteCommentHandler}
                downVoteCommentHandler={downVoteCommentHandler}
              />
            ))}
        </div>
      ) : (
        <Spinner aria-label="Spinner thread detail" size="xl" />
      )}
    </div>
  );
}

export default ThreadDetail;
