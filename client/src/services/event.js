import { API_URL } from '../config';
import { handleResponse } from '../utilities';

function createEvent(
  owner,
  title,
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
      description,
      start,
      end,
      cost,
      address,
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

// TODO: change this and getEvents() to be a polymorphic get()/get(id)
function getEvent(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const encodedParams = encodeURIComponent(id);

  return fetch(`${API_URL}/api/events?id=${encodedParams}`, requestOptions)
    .then(handleResponse)
    .then({
      if(event) {
        return event;
      }
    });
}

function getEvents() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`${API_URL}/api/events`, requestOptions)
    .then(handleResponse)
    .then({
      if(data) {
        return data;
      }
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
      requestCopy
    })
  };

  return fetch(`${API_URL}/api/event/announcement`, requestOptions)
    .then(handleResponse)
    .then({
      if(data) {
        return data;
      }
    });
}

export const eventService = {
  createEvent,
  getEvent,
  getEvents,
  sendAnnouncement
};
