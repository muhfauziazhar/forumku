import * as React from 'react';
import { Spinner, Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllLeaderboards, selectLeaderboard } from '../states/leaderboards/slice';

function Leaderboard() {
  const leaderboards = useSelector(selectLeaderboard);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncGetAllLeaderboards());
  }, []);

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Rank</Table.HeadCell>
        <Table.HeadCell>Avatar</Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Score</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {leaderboards.isLoading && (
        <Table.Row>
          <Table.Cell>
            <Spinner aria-label="Spinner list leaderboard" size="xl" />
          </Table.Cell>
          <Table.Cell>
            <Spinner aria-label="Spinner list leaderboard" size="xl" />
          </Table.Cell>
          <Table.Cell>
            <Spinner aria-label="Spinner list leaderboard" size="xl" />
          </Table.Cell>
          <Table.Cell>
            <Spinner aria-label="Spinner list leaderboard" size="xl" />
          </Table.Cell>
        </Table.Row>
        )}
        {!leaderboards.isLoading
                    && leaderboards.data
                    && leaderboards.data.map((leaderboard, index) => (
                      <Table.Row key={`${leaderboard.user.name}-key`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>
                          <img alt="profile" className="w-10 h-10" src={leaderboard.user.avatar} />
                        </Table.Cell>
                        <Table.Cell>{leaderboard.user.name}</Table.Cell>
                        <Table.Cell>{leaderboard.score}</Table.Cell>
                      </Table.Row>
                    ))}
      </Table.Body>
    </Table>
  );
}

export default Leaderboard;
