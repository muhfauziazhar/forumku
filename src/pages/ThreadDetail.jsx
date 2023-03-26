import React from 'react';
import { Button, Card } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import {
    asyncDownVoteComment,
    asyncDownVoteThread,
    asyncGetDetailThread,
    asyncUpVoteComment,
    asyncUpVoteThread,
    selectDetailThread,
} from '../states/threads/slice';
import { useParams } from 'react-router-dom';
import { asyncGetOwnProfile, selectUser } from '../states/users/slice';
import { showFormattedDate } from '../utils/helper';

const ThreadDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const threadDetail = useSelector(selectDetailThread);

    const upVoteThreadHandler = () =>
        dispatch(asyncUpVoteThread({ threadId: threadDetail.id }));
    const downVoteThreadHandler = () =>
        dispatch(asyncDownVoteThread({ threadId: threadDetail.id }));
    const upVoteCommentHandler = ({ commentId }) =>
        dispatch(asyncUpVoteComment({ threadId: threadDetail.id, commentId }));
    const downVoteCommentHandler = ({ commentId }) =>
        dispatch(
            asyncDownVoteComment({ threadId: threadDetail.id, commentId })
        );

    const isVoteByMe =
        user &&
        user.ownProfile &&
        threadDetail &&
        threadDetail.upVotesBy &&
        threadDetail.upVotesBy.includes(user.ownProfile.id);
    const isDownVoteByMe =
        user &&
        user.ownProfile &&
        threadDetail &&
        threadDetail.downVotesBy &&
        threadDetail.downVotesBy.includes(user.ownProfile.id);

    React.useEffect(() => {
        if (params.threadId) {
            dispatch(asyncGetDetailThread({ threadId: params.threadId }));
            user.isLogin && dispatch(asyncGetOwnProfile());
        }
    }, [dispatch, params, isVoteByMe, isDownVoteByMe]);

    return (
        threadDetail && (
            <div className='max-w-screen-xl'>
                <Card>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <div className='flex flex-row'>
                            <span className=' bg-blue-200 text-blue-800 text-sm font-medium p-2 rounded dark:bg-blue-900 dark:text-blue-300'>
                                {threadDetail.category}
                            </span>
                            <h1 className='ml-3 text-2xl font-bold  text-gray-900 dark:text-white'>
                                {threadDetail.title}
                            </h1>
                        </div>

                        <div className='flex flex-row mt-3 md:mt-0'>
                            <img
                                className='h-8 w-8 rounded-full shadow-lg'
                                src={threadDetail.owner.avatar}
                                alt='Profile Image'
                            />
                            <div className='ml-3'>
                                <h5 className='text-sm font-medium text-gray-900 dark:text-white'>
                                    {threadDetail.owner.name}
                                </h5>
                                <h6 className='text-xs text-gray-400 dark:text-white'>
                                    {showFormattedDate(threadDetail.createdAt)}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: threadDetail.body }}
                    />
                    <div className='flex justify-between'>
                        <div className=' flex flex-row items-center'>
                            <Button
                                outline={isVoteByMe ? false : true}
                                gradientDuoTone='greenToBlue'
                                onClick={() => upVoteThreadHandler()}
                                disabled={isVoteByMe || !user.ownProfile}
                            >
                                <svg
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth={1.5}
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                    aria-hidden='true'
                                    className='w-6 h-6 dark:text-white'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75'
                                    />
                                </svg>
                            </Button>
                            <Button
                                outline={isDownVoteByMe ? false : true}
                                onClick={() => downVoteThreadHandler()}
                                disabled={isDownVoteByMe || !user.ownProfile}
                                gradientDuoTone='pinkToOrange'
                                className='ml-2'
                            >
                                <svg
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth={1.5}
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                    aria-hidden='true'
                                    className='w-6 h-6 dark:text-white'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75'
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        )
    );
};

export default ThreadDetail;
