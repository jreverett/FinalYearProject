import { API_URL } from '../config';
import { handleResponse } from '../utilities';

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

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  console.log('id is: ', id);
  const encodedParams = encodeURIComponent(id);

  return fetch(`${API_URL}/api/users?id=${encodedParams}`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      }
    });
}

function update(id, email, emailConsent, address) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, email, emailConsent, address })
  };

  console.log('vals', id, email, emailConsent, address);
  return fetch(`${API_URL}/api/user/update`, requestOptions)
    .then(handleResponse)
    .then({
      if(user) {
        return user;
      }
    });
}

// function deleteUser() {
//   // TODO
// }

export const userService = {
  signup,
  get,
  update
};
