import * as React from 'react';
import { Button, Card } from 'flowbite-react';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/helper';

function CommentList({
  user, comment, upVoteCommentHandler, downVoteCommentHandler,
}) {
  const isVoteByMe = user && comment && comment.upVotesBy && comment.upVotesBy.includes(user.id);
  const isDownVoteByMe = user && comment && comment.downVotesBy && comment.downVotesBy.includes(user.id);

  return (
    <Card className="max-w-screen-xl mt-3">
      <div className="flex flex-row">
        <img className="h-8 w-8 rounded-full shadow-lg" src={comment.owner.avatar} alt="Profile" />
        <div className="ml-3">
          <h5 className="text-sm font-medium text-gray-900 dark:text-white">{comment.owner.name}</h5>
          <h6 className="text-xs text-gray-400 dark:text-white">{showFormattedDate(comment.createdAt)}</h6>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.content }} />
      <div className="flex justify-between">
        <div className=" flex flex-row items-center">
          <Button
            outline={!isVoteByMe}
            gradientDuoTone="greenToBlue"
            onClick={() => upVoteCommentHandler({ commentId: comment.id })}
            disabled={isVoteByMe || !user}
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
          </Button>
          <Button
            outline={!isDownVoteByMe}
            onClick={() => downVoteCommentHandler({ commentId: comment.id })}
            disabled={isDownVoteByMe || !user}
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
  );
}

CommentList.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  upVoteCommentHandler: PropTypes.func.isRequired,
  downVoteCommentHandler: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default CommentList;
