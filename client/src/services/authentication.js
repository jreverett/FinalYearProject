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
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout(email) {
  // remove user value from localStorage, push null to observable
  localStorage.removeItem('loggedInUser');
  currentUserSubject.next(null);
}

export const authenticationService = {
  login,
  logout,
  loggedInUser: currentUserSubject.asObservable(),
  get loggedInUserValue() {
    return this.currentUserSubject.value;
  }
};
