import { API_URL } from '../config';
import { handleResponse } from '../utilities';

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${API_URL}/api/user/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user) {
        // TODO
      }

      return user;
    });
}

function logout(email) {
  // TODO: this (delete jwt session token)
}

export const authenticationService = {
  login,
  logout
};
