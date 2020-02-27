import { API_URL } from '../config';

function createEvent(owner, title, description, start, end, cost, images) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      owner,
      title,
      description,
      start,
      end,
      cost,
      images
    })
  };

  return fetch(`${API_URL}/api/event/create`, requestOptions)
    .then(handleResponse)
    .then({
      if(event) {
        return event;
      }
    });
}

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

export const eventService = {
  createEvent
};
