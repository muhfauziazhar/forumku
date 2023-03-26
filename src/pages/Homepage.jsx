import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadCard from '../components/ThreadCard';
import { asyncGetAllThreads, selectThread } from '../states/threads/slice';
import { asyncGetAllUsers } from '../states/users/slice';

const Homepage = () => {
    const threads = useSelector(selectThread);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(asyncGetAllThreads());
        dispatch(asyncGetAllUsers());
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {threads.loading && <>Loading...</>}
            {!threads.loading &&
                threads.data &&
                threads.data.map((thread) => (
                    <ThreadCard key={thread.id} data={thread} />
                ))}
        </div>
    );
};

export default Homepage;
