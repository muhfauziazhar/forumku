import * as React from 'react';
import { Card } from 'flowbite-react';
import { getUserById, showFormattedDate } from '../utils/helper';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../states/users/slice';
import { URL } from '../constant/Url';

const ThreadCard = ({ data }) => {
    const users = useSelector(selectUser);
    const getName =
        data.ownerId &&
        getUserById({
            ownerId: data.ownerId,
            users,
        });
    return (
        <div className='max-w-md hover:shadow-lg'>
            <Link to={URL.THREAD_DETAIL.replace(':threadId', data.id)}>
                <Card>
                    <div className='flex flex-row'>
                        <img
                            className='h-12 w-12 rounded-full shadow-lg'
                            src={`https://ui-avatars.com/api/?name=${getName}`}
                            alt='Profile Image'
                        />
                        <div className='ml-3'>
                            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>
                                {getName}
                            </h5>
                            <h6 className='text-gray-400 dark:text-white'>
                                {showFormattedDate(data.createdAt)}
                            </h6>
                        </div>
                    </div>
                    <div>
                        <p className='text-lg  text-gray-900 dark:text-white'>
                            {data.title}
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <div className=' flex flex-row items-center'>
                            <svg
                                fill='rgb(195 221 253)'
                                stroke='#515BD4'
                                strokeWidth=''
                                xmlns='http://www.w3.org/2000/svg'
                                aria-hidden='true'
                                className='w-6 h-6 dark:text-white'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                                ></path>
                            </svg>
                            <p className='mr-2 text-lg font-semibold text-blue-900 dark:text-white'>
                                {data.upVotesBy.length}
                            </p>
                            <svg
                                fill='rgb(195 221 253)'
                                stroke='#515BD4'
                                strokeWidth={1}
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                                aria-hidden='true'
                                className='w-8 h-6 dark:text-white'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                                />
                            </svg>
                            <p className='text-lg font-semibold text-blue-900 dark:text-white'>
                                {data.totalComments}
                            </p>
                        </div>
                        <div>
                            <span className='bg-blue-200 text-blue-800 text-xs font-medium p-2 rounded dark:bg-blue-900 dark:text-blue-300'>
                                {data.category}
                            </span>
                        </div>
                    </div>
                </Card>
            </Link>
        </div>
    );
};

export default ThreadCard;
