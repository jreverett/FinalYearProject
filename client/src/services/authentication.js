import { BehaviorSubject } from 'rxjs';

import { API_URL } from '../config';
import { handleResponse } from '../utilities';

// setup user observable
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('loggedInUser'))
);

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
      updateUserObservable(user);

      return user;
    });
}

function logout() {
  // remove user value from localStorage, push null to observable
  localStorage.removeItem('loggedInUser');
  currentUserSubject.next(null);
}

function updateUserObservable(user) {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
  currentUserSubject.next(user);
}

export const authenticationService = {
  login,
  logout,
  loggedInUser: currentUserSubject.asObservable(),
  updateUserObservable,
  get loggedInUserValue() {
    return currentUserSubject ? currentUserSubject.value : null;
  }
};
