import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncPostComment } from '../states/threads/slice';

function CommentInput() {
  const dispatch = useDispatch();
  const params = useParams();

  const [content, setContent] = React.useState('');
  const handleChange = (e) => {
    setContent(e.target.innerHTML);
  };
  const handleSubmit = () => {
    dispatch(asyncPostComment({ threadId: params.threadId, content }));
  };

  return (
    <div className="flex flex-col max-w-screen-xl mt-3">
      <div className="flex relative ">
        <span>
          <button
            onClick={handleSubmit}
            type="submit"
            className="py-2 px-3 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <svg
              className="w-6 h-6 dark:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </span>
        <div
          onInput={handleChange}
          contentEditable
          className="ml-2 rounded-lg appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          data-placeholder="Masukkan komentar kamu"
        />
      </div>
    </div>
  );
}

export default CommentInput;
