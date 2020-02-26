import { API_URL } from '../config';

function signup(firstname, lastname, email, address, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstname, lastname, email, address, password })
  };

  return fetch(`${API_URL}/api/user/signup`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      }
    });
}

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
        console.log('logged in!');
        // TODO: set jwt auth here
      }

      return user;
    });
}

function logout(email) {
  // TODO: this (delete jwt session token)
}

// function deleteUser() {
//   // TODO
// }

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusMessage;
      return Promise.reject(error);
    }

    return data;
  });
}

export const userService = {
  signup,
  login,
  logout
};
