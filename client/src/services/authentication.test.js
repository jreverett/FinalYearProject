import fetchMock from 'fetch-mock-jest';
import { authenticationService } from './';
import { API_URL } from '../config';
fetchMock.config.overwriteRoutes = true;

describe('authentication service', () => {
  afterEach(() => {
    fetchMock.mockClear();
  });

  afterAll(() => {
    fetchMock.mockReset();
  });

  ////////////////////////////////////////
  // LOGIN
  ////////////////////////////////////////
  const email = 'jreverett2442@gmail.com';
  const password = 'tester';

  it('should log in the user', (done) => {
    fetchMock.post(`${API_URL}/api/user/login`, {
      status: 200,
      _id: '315553523030303030303031',
      firstname: 'Jamie',
      lastname: 'Everett',
      email: 'jreverett2442@gmail.com',
      emailConsent: true,
      address: {
        description: 'Nailsea, UK',
      },
      verified: true,
      ownedEvents: ['314556543030303030303031'],
      subscriptions: ['314556543030303030303034'],
      token: 'test-token',
    });

    authenticationService.login(email, password).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.firstname).toEqual('Jamie');
      expect(res.address.description).toEqual('Nailsea, UK');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/login`);
  });

  it('should return an appropriate if the user is suspended', (done) => {
    fetchMock.post(`${API_URL}/api/user/login`, {
      status: 403,
      message: 'This account has been suspended',
    });

    authenticationService.login(email, password).then((res) => {
      expect(res.status).toEqual(403);
      expect(res.message).toEqual('This account has been suspended');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/login`);
  });

  ////////////////////////////////////////
  // CHECK RESET TOKEN VALIDITY
  ////////////////////////////////////////
  it('should validate a valid reset token', (done) => {
    const token = '9b5a1778d5fe985183aa7b1e31eff92696a51f74';

    fetchMock.post(`${API_URL}/api/user/verify-token`, {
      status: 200,
      message: 'VALID',
      user: {
        type: 1,
        emailConsent: true,
        verified: true,
        ownedEvents: ['314556543030303030303031'],
        subscriptions: ['314556543030303030303034', '314556543030303030303035'],
        suspended: false,
        _id: '315553523030303030303031',
        firstname: 'Jamie',
        lastname: 'Everett',
        email: 'jreverett2442@gmail.com',
        address: {
          description: 'Plymouth, UK',
        },
        hash:
          'bac8145eebab710ba10e3364de8526e5c43e60e513a22646255eb45c5f42a1d0bf2d63c4499464097e0bfbf0b824b58aaf072cfdf6c684c8fd8998476328ac63',
        salt: 'd4c1756f3e6ad74e3ecd460c54287d7e',
        resetToken: '9b5a1778d5fe985183aa7b1e31eff92696a51f74',
        resetTokenExpiration: '2020-05-21T00:17:33.425Z',
        __v: 6,
      },
    });

    authenticationService.checkResetTokenValidity(token).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.message).toEqual('VALID');
      expect(res.user.type).toEqual(1);
      expect(res.user.address.description).toEqual('Plymouth, UK');
      expect(res.user.suspended).toEqual(false);
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/verify-token`);
  });

  it('should return an appropriate error if the reset token is invalid', (done) => {
    const token = '9b5a1778d5fe9851X3aa7b1e31eff92696a50000';

    fetchMock.post(`${API_URL}/api/user/verify-token`, {
      status: 500,
      message: 'This reset link is invalid, please request a new one',
    });

    authenticationService.checkResetTokenValidity(token).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual(
        'This reset link is invalid, please request a new one'
      );
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/verify-token`);
  });
});
