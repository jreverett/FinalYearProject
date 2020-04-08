import { BehaviorSubject } from 'rxjs';

import { API_URL } from '../config';
import { handleResponse } from '../utilities';

// setup user observable
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('loggedInUser'))
);

function signup(firstname, lastname, email, address, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstname, lastname, email, address, password })
  };

  return fetch(`${API_URL}/api/user/signup`, requestOptions) //TODO: change this to use /api/users (POST)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      }
    });
}

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const encodedParams = encodeURIComponent(id);

  return fetch(`${API_URL}/api/users?id=${encodedParams}`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      }
    });
}

function updateUserObservable(userData) {
  localStorage.setItem('loggedInUser', JSON.stringify(userData));
  currentUserSubject.next(userData);
}

function update(id, email, emailConsent, address) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, email, emailConsent, address })
  };

  return fetch(`${API_URL}/api/user/update`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      }
    });
}

function forgotPassword(email) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  };

  return fetch(`${API_URL}/api/user/forgot-password`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      }
    });
}

function resetPassword(token, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password })
  };

  return fetch(`${API_URL}/api/user/reset-password`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      }
    });
}

function subscribe(userID, eventID) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userID, eventID })
  };

  return fetch(`${API_URL}/api/user/subscribe`, requestOptions)
    .then(handleResponse)
    .then({
      if(subscription) {
        return subscription;
      }
    });
}

function unsubscribe(userID, eventID) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userID, eventID })
  };

  return fetch(`${API_URL}/api/user/unsubscribe`, requestOptions)
    .then(handleResponse)
    .then({
      if(unsubscription) {
        return unsubscription;
      }
    });
}

// function deleteUser() {
//   // TODO
// }

export const userService = {
  loggedInUser: currentUserSubject.asObservable(),
  updateUserObservable,
  signup,
  get,
  subscribe,
  unsubscribe,
  update,
  forgotPassword,
  resetPassword,
  get loggedInUserValue() {
    return currentUserSubject ? currentUserSubject.value : null;
  }
};
