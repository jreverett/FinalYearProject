// function signup() {
//   // TODO
// }

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`http://localhost:9000/api/user/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user) {
        // TODO: set jwt auth here
      }

      return user;
    });
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
  login
};
