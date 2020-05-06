import { API_URL } from '../config';
import { handleResponse } from '../utilities';

function createEvent(
  owner,
  title,
  topic,
  description,
  start,
  end,
  cost,
  address,
  images
) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      owner,
      title,
      topic,
      description,
      start,
      end,
      cost,
      address,
      images,
    }),
  };

  return fetch(`${API_URL}/api/event/create`, requestOptions)
    .then(handleResponse)
    .then({
      if(event) {
        return event;
      },
    });
}

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  let urlString = `${API_URL}/api/events`;

  // if id specified, only fetch that event
  if (arguments.length === 1) {
    const encodedParams = encodeURIComponent(id);
    urlString = `${API_URL}/api/events?id=${encodedParams}`;
  }

  return fetch(urlString, requestOptions)
    .then(handleResponse)
    .then({
      if(data) {
        return data;
      },
    });
}

function getEventCount() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${API_URL}/api/event/event-count`, requestOptions)
    .then(handleResponse)
    .then({
      if(data) {
        return data;
      },
    });
}

function deleteEvent(eventID) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventID }),
  };

  return fetch(`${API_URL}/api/events`, requestOptions)
    .then(handleResponse)
    .then({
      if(data) {
        return data;
      },
    });
}

function sendAnnouncement(
  userID,
  eventID,
  scheduleSendDateTime,
  subject,
  body,
  requestCopy
) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userID,
      eventID,
      scheduleSendDateTime,
      subject,
      body,
      requestCopy,
    }),
  };

  return fetch(`${API_URL}/api/event/announcement`, requestOptions)
    .then(handleResponse)
    .then({
      if(data) {
        return data;
      },
    });
}

export const eventService = {
  createEvent,
  get,
  getEventCount,
  deleteEvent,
  sendAnnouncement,
};
