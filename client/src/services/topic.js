import { API_URL } from '../config';
import { handleResponse } from '../utilities';

function get() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${API_URL}/api/topics`, requestOptions)
    .then(handleResponse)
    .then((topics) => {
      return topics;
    });
}

export const topicService = {
  get,
};
