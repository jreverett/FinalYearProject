import fetchMock from 'fetch-mock-jest';
import { eventService } from './';
import { API_URL } from '../config';
fetchMock.config.overwriteRoutes = true;

describe('event service', () => {
  afterEach(() => {
    fetchMock.mockClear();
  });

  afterAll(() => {
    fetchMock.mockReset();
  });

  ////////////////////////////////////////
  // CREATE
  ////////////////////////////////////////
  const mockEventData = {
    owner: '315556543030303030303034',
    title: 'Test Event',
    topic: 'Performing Arts',
    description: 'Test event description',
    start: Date.now() + 10000,
    end: Date.now() + 200000,
    cost: 12,
    address: {
      description: 'Manchester, UK',
      // superflouous data removed
    },
    images: [],
  };

  it('should create an event', (done) => {
    fetchMock.post(`${API_URL}/api/events`, {
      status: 201,
      message: 'Event added successfully',
    });

    eventService.createEvent(mockEventData).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.message).toEqual('Event added successfully');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/events`);
  });

  it('should return an appropriate error if event creation fails', (done) => {
    fetchMock.post(`${API_URL}/api/events`, {
      status: 500,
      message: 'Failed to create event: *err*',
    });

    eventService.createEvent(mockEventData).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('Failed to create event: *err*');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/events`);
  });

  ////////////////////////////////////////
  // GET (ALL)
  ////////////////////////////////////////
  it('should get all events', (done) => {
    fetchMock.get(`${API_URL}/api/events`, {
      status: 200,
      data: [
        {
          owner: '12345',
          title: 'Test Title',
          topic: 'Other',
          description: 'Test description.',
          start: '2020-09-30T08:30:00.000Z',
          end: '',
          cost: '',
          address: {
            description: 'Bristol, UK',
            // superflouous data removed
          },
          images: [],
        },
        {
          owner: '54321',
          title: 'Game Night',
          topic: 'Film, Media & Entertainment',
          description: 'Test description for game night.',
          start: '2020-07-26T18:00:00.000Z',
          end: '2020-07-26T22:00:00.000Z',
          cost: 4,
          address: {
            description: 'Glasgow, UK',
            // superflouous data removed
          },
          images: [],
        },
      ],
    });

    eventService.get().then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data[0].title).toEqual('Test Title');
      expect(res.data[1].cost).toEqual(4);
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/events`);
  });

  it('should return an appropriate error if no events exist', (done) => {
    fetchMock.get(`${API_URL}/api/events`, {
      status: 500,
      message: 'No events found',
    });

    eventService.get().then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('No events found');
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/events`);
  });

  ////////////////////////////////////////
  // GET (BY ID)
  ////////////////////////////////////////
  it('should get a single event by its ID', (done) => {
    const mockEventID = '314556543030303030303030';

    fetchMock.get(`${API_URL}/api/events?id=${mockEventID}`, {
      status: 200,
      data: {
        owner: '12345',
        title: 'Test Title',
        topic: 'Other',
        description: 'Test description',
        start: '2020-05-30T22:00:00.000Z',
        end: '',
        cost: '',
        address: {
          description: 'Bristol, UK',
          // superflouous data removed
        },
        images: [],
      },
    });

    eventService.get(mockEventID).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data.title).toEqual('Test Title');
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/events?id=${mockEventID}`);
  });

  it('should return an appropriate error if an invalid ID is supplied', (done) => {
    const mockEventID = '312526543030303034303132';

    fetchMock.get(`${API_URL}/api/events?id=${mockEventID}`, {
      status: 500,
      message: 'No events found',
    });

    eventService.get(mockEventID).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('No events found');
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/events?id=${mockEventID}`);
  });

  ////////////////////////////////////////
  // GET EVENT COUNT
  ////////////////////////////////////////
  it('should get the event count', (done) => {
    fetchMock.get(`${API_URL}/api/event/event-count`, {
      status: 200,
      data: 142, // the event count
    });

    eventService.getEventCount().then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(142);
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/event/event-count`);
  });

  it('should return an appropriate error if theres an error getting the event count', (done) => {
    fetchMock.get(`${API_URL}/api/event/event-count`, {
      status: 500,
      message: 'Error getting event count: *err*',
    });

    eventService.getEventCount().then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('Error getting event count: *err*');
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/event/event-count`);
  });

  ////////////////////////////////////////
  // DELETE EVENT
  ////////////////////////////////////////
  const mockEventID = '324556543030303030304261';
  let mockUserID = '312556543030303030305464';

  it('should delete an event', (done) => {
    fetchMock.delete(`${API_URL}/api/events`, {
      status: 204,
      message: null,
    });

    eventService.deleteEvent(mockUserID, mockEventID).then((res) => {
      expect(res.status).toEqual(204);
      expect(res.message).toBeNull();
      done();
    });
    expect(fetchMock).toHaveDeleted(`${API_URL}/api/events`);
  });

  mockUserID = null;

  it('should return an appropriate error if no userID is supplied when deleting an event', (done) => {
    fetchMock.delete(`${API_URL}/api/events`, {
      status: 400,
      message: 'Missing event or user ID',
    });

    eventService.deleteEvent(mockUserID, mockEventID).then((res) => {
      expect(res.status).toEqual(400);
      expect(res.message).toEqual('Missing event or user ID');
      done();
    });
    expect(fetchMock).toHaveDeleted(`${API_URL}/api/events`);
  });

  ////////////////////////////////////////
  // SEND ANNOUNCEMENT
  ////////////////////////////////////////
  const mockAnnouncementData = {
    userID: '304556543030303030303834',
    eventID: '314556543030303030303231',
    scheduleSendDateTime: Date.now() + 12500,
    subject: 'Test Announcement',
    body: 'This is a test announcement',
    requestCopy: true,
  };

  it('should send an announcmenet', (done) => {
    fetchMock.post(`${API_URL}/api/event/announcement`, {
      status: 200,
      message: 'Announcement request successful',
    });

    eventService.sendAnnouncement(mockAnnouncementData).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.message).toEqual('Announcement request successful');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/event/announcement`);
  });

  it('should return an appropriate error if a non-owner tries to send an announcmenet', (done) => {
    fetchMock.post(`${API_URL}/api/event/announcement`, {
      status: 403,
      message: 'Only the event owner can send announcements',
    });

    eventService.sendAnnouncement(mockAnnouncementData).then((res) => {
      expect(res.status).toEqual(403);
      expect(res.message).toEqual(
        'Only the event owner can send announcements'
      );
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/event/announcement`);
  });
});
