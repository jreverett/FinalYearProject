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
    body: JSON.stringify({ firstname, lastname, email, address, password }),
  };

  return fetch(`${API_URL}/api/user/signup`, requestOptions) //TODO: change this to use /api/users (POST)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      },
    });
}

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  let urlString = `${API_URL}/api/users`;

  // if id specified, only fetch that event
  if (arguments.length === 1) {
    const encodedParams = encodeURIComponent(id);
    urlString = `${API_URL}/api/users?id=${encodedParams}`;
  }

  return fetch(urlString, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      },
    });
}

function updateUserObservable(userData) {
  localStorage.setItem('loggedInUser', JSON.stringify(userData));
  currentUserSubject.next(userData);
}

/**
 * Updates a user document with the passed in *params* object. Any null
 * values will be ignored in the update operation.
 * @param {string} userID The user to update.
 * @param {...object} params The property or propeties to update, e.g. { emailConsent: true }.
 */
function update(userID, { ...params }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userID, ...params }),
  };

  return fetch(`${API_URL}/api/user/update`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      },
    });
}

function forgotPassword(email) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  };

  return fetch(`${API_URL}/api/user/forgot-password`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      },
    });
}

function resetPassword(token, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  };

  return fetch(`${API_URL}/api/user/reset-password`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      },
    });
}

function subscribe(userID, eventID) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userID, eventID }),
  };

  return fetch(`${API_URL}/api/user/subscribe`, requestOptions)
    .then(handleResponse)
    .then({
      if(subscription) {
        return subscription;
      },
    });
}

function unsubscribe(userID, eventID) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userID, eventID }),
  };

  return fetch(`${API_URL}/api/user/unsubscribe`, requestOptions)
    .then(handleResponse)
    .then({
      if(unsubscription) {
        return unsubscription;
      },
    });
}

// function deleteUser(userID) {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ userID }),
//   };

//   return fetch(`${API_URL}/api/users`, requestOptions)
//     .then(handleResponse)
//     .then({
//       if(res) {
//         return res;
//       },
//     });
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
  // deleteUser,
  get loggedInUserValue() {
    return currentUserSubject ? currentUserSubject.value : null;
  },
};
