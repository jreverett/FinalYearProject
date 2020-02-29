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

// function deleteUser() {
//   // TODO
// }

export const userService = {
  signup
};
