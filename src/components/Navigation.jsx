import * as React from 'react';
import { Navbar, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../constant/Url';
import { asyncGetOwnProfile, selectUser, unSetAuthUser } from '../states/users/slice';
import { getToken } from '../utils/helper';

function Navigation() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(unSetAuthUser());
    navigate(URL.LOGIN);
  };

  React.useEffect(() => {
    if (!token) {
      dispatch(unSetAuthUser());
    }
    if (token) {
      dispatch(asyncGetOwnProfile());
    }
  }, [token]);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Forumku" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Forumku</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {token ? (
          <>
            <Link to={URL.THREAD_POST}>
              <Button>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-6 h-6 mr-2 dark:text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thread
              </Button>
            </Link>

            <Button onClick={handleLogout} className="ml-3">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-6 h-6 mr-2 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </Button>
            <Button outline className="ml-3">
              <img className="h-6 w-6 mr-2 rounded-full shadow-lg" src={user && user.ownProfile && user.ownProfile.avatar} alt="Profile" />
              {user && user.ownProfile && user.ownProfile.name}
            </Button>
          </>
        ) : (
          <Link
            to={URL.LOGIN}
            className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <Button>Login</Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link
              to={URL.HOMEPAGE}
              className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={URL.LEADERBOARDS}
              className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Leaderboards
            </Link>
          </li>
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
