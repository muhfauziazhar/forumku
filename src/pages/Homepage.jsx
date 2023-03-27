import { Spinner } from 'flowbite-react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryFilter from '../components/CategoryFilter';
import ThreadCard from '../components/ThreadCard';
import { asyncGetAllThreads, selectThread } from '../states/threads/slice';
import { asyncGetAllUsers } from '../states/users/slice';

function Homepage() {
  const threads = useSelector(selectThread);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncGetAllThreads());
    dispatch(asyncGetAllUsers());
  }, []);

  return (
    <>
      <div className="flex flex-row mb-3 flex-wrap">
        <CategoryFilter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {threads.isLoading && <Spinner aria-label="Spinner list thread" size="xl" />}
        {!threads.isLoading && !threads.filtered && threads.data && threads.data.map((thread) => <ThreadCard key={thread.id} data={thread} />)}
        {!threads.isLoading && threads.filtered && threads.filtered.map((thread) => <ThreadCard key={thread.id} data={thread} />)}
      </div>
    </>
  );
}

export default Homepage;
