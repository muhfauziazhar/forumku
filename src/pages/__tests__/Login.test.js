/**
 * test scenarios for login page
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from '../../states/store';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Login from '../Login';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

test('Render login page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  const user = userEvent.setup();
  const email = screen.getByTestId('input-email');
  const password = screen.getByTestId('input-password');

  await user.type(email, 'tesze2@gmail.com');
  await user.type(password, 'tesze2');

  await user.click(screen.getByTestId('login'));

  await waitFor(() => {
    expect(email.value).toBe('tesze2@gmail.com');
    expect(password.value).toBe('tesze2');
  });
});
