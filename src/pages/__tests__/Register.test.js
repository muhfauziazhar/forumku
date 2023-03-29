/**
 * test scenarios for register page
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from '../../states/store';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Register from '../Register';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

test('Render register page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  const user = userEvent.setup();
  const name = screen.getByTestId('input-name');
  const email = screen.getByTestId('input-email');
  const password = screen.getByTestId('input-password');

  await user.type(name, 'name');
  await user.type(email, 'email@gmail.com');
  await user.type(password, 'password');

  await user.click(screen.getByRole('button', { name: /Register/i }));

  await waitFor(() => {
    expect(name.value).toBe('name');
    expect(email.value).toBe('email@gmail.com');
    expect(password.value).toBe('password');
  });
});
