import { API_URL } from '../config';
import { userService } from '../services';
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
      // store user info in localStorage, push user data to observable
      userService.updateUserObservable(user);

      return user;
    });
}

function logout() {
  // remove user value from localStorage, push null to observable
  localStorage.removeItem('loggedInUser');
  userService.updateUserObservable(null);
}

function checkResetTokenValidity(token) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  };

  return fetch(`${API_URL}/api/user/verify-token`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

export const authenticationService = {
  login,
  logout,
  checkResetTokenValidity
};
