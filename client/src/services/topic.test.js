import fetchMock from 'fetch-mock-jest';
import { topicService } from './';
import { API_URL } from '../config';
fetchMock.config.overwriteRoutes = true;

describe('topic service', () => {
  afterEach(() => {
    fetchMock.mockClear();
  });

  afterAll(() => {
    fetchMock.mockReset();
  });

  ////////////////////////////////////////
  // GET
  ////////////////////////////////////////
  it('should get all of the topics', (done) => {
    fetchMock.get(`${API_URL}/api/topics`, {
      status: 200,
      data: [
        {
          _id: '5ec53ca68b9adf55a6898125',
          name: 'Religion & Spirituality',
          __v: 0,
        },
        {
          _id: '5ec53ca68b9adf55a6898125',
          name: 'Charities & Causes',
          __v: 0,
        },
        // Topic list truncated
      ],
    });

    topicService.get().then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data[0].name).toEqual('Religion & Spirituality');
      expect(res.data[1]._id).toEqual('5ec53ca68b9adf55a6898125');
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/topics`);
  });

  it('should return an appropriate error if no topics are found', (done) => {
    fetchMock.get(`${API_URL}/api/topics`, {
      status: 500,
      message: 'No topics found',
    });

    topicService.get().then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('No topics found');
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/topics`);
  });
});
