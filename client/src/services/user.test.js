import fetchMock from 'fetch-mock-jest';
import { userService } from './';
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
  // SIGN UP
  ////////////////////////////////////////
  const userMockData = {
    firstname: 'Jamie',
    lastname: 'Everett',
    email: 'jreverett2442@gmail.com',
    address: 'Nailsea, Bristol, UK',
    password: 'tester',
  };

  it('should create an account for the user', (done) => {
    fetchMock.post(`${API_URL}/api/users`, {
      status: 201,
      message: 'User added successfully',
    });

    userService.signup(userMockData).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.message).toEqual('User added successfully');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/users`);
  });

  it('should return an appropriate error if an error occours during user creation', (done) => {
    fetchMock.post(`${API_URL}/api/users`, {
      status: 500,
      message: 'Failed to add user',
    });

    userService.signup(userMockData).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('Failed to add user');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/users`);
  });

  ////////////////////////////////////////
  // GET (ALL)
  ////////////////////////////////////////
  it('should get all users', (done) => {
    fetchMock.get(`${API_URL}/api/users`, {
      status: 200,
      data: [
        {
          type: 1,
          emailConsent: true,
          verified: true,
          ownedEvents: ['314556543030303030303031'],
          subscriptions: ['314556543030303030303034'],
          suspended: false,
          _id: '315553523030303030303031',
          firstname: 'Jamie',
          lastname: 'Everett',
          email: 'jreverett2442@gmail.com',
          address: {
            description: 'Nailsea, UK',
          },
          hash:
            'bac8145eebab710ba10e3364de8526e5c43e60e513a22646255eb45c5f42a1d0bf2d63c4499464097e0bfbf0b824b58aaf072cfdf6c684c8fd8998476328ac63',
          salt: 'd4c1756f3e6ad74e3ecd460c54287d7e',
          resetToken: '9b5a1778d5fe985183aa7b1e31eff92696a51f74',
          resetTokenExpiration: '2020-05-21T00:17:33.425Z',
          __v: 6,
        },
        {
          type: 1,
          emailConsent: true,
          verified: true,
          ownedEvents: [],
          subscriptions: [],
          suspended: false,
          _id: '315553523030303030303033',
          firstname: 'Fulton',
          lastname: 'Briggs',
          email: 'aliquam.arcu@lobortis.net',
          address: {
            description: '13 Glasgow Road, Edinburgh, UK',
          },
          hash:
            'GFIlpI1UuNRNrx5KW6sY3DylAF0iuBSLGSvFq2X7GMB6g28l2ckpGlJqLs1Dx3NKhGtlI1iu6kbC03rYM6GIesG0BQPEuxXEwnUHkSlk9wDYCOX3u1vwAq5NBohGpfus',
          salt: 'MypSs9ahrdLkUndBLtY17py52XUOhc9A',
          resetToken: '',
          resetTokenExpiration: null,
          __v: 0,
        },
      ],
    });

    userService.get().then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data[0].firstname).toEqual('Jamie');
      expect(res.data[0].salt).toEqual('d4c1756f3e6ad74e3ecd460c54287d7e');
      expect(res.data[1].type).toEqual(1);
      expect(res.data[1].address.description).toEqual(
        '13 Glasgow Road, Edinburgh, UK'
      );
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/users`);
  });

  it('should return an appropriate error if an error occours getting users', (done) => {
    fetchMock.get(`${API_URL}/api/users`, {
      status: 500,
      message: 'Error getting users: ',
    });

    userService.get().then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('Error getting users: ');
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/users`);
  });

  ////////////////////////////////////////
  // GET (BY ID)
  ////////////////////////////////////////
  it('should get a single user by their ID', (done) => {
    const mockUserID = '314556543030303030303131';

    fetchMock.get(`${API_URL}/api/users?id=${mockUserID}`, {
      status: 200,
      data: {
        type: 0,
        emailConsent: true,
        verified: true,
        ownedEvents: [],
        subscriptions: [],
        suspended: false,
        _id: '315553523030303030303033',
        firstname: 'Brian',
        lastname: 'May',
        email: 'aliqdam.arcu@lobortes.net',
        address: {
          description: '13 Broad Road, Backwell, UK',
        },
        hash:
          'GFIlpI1UuNRNrx58KDwY3DylAF0iuBSLGSvFq2X7GMB6g28l2ckpGlJqLs1Dx3NKhGtlI1iu6kbC03rYM6GIesG0BQPEuxXEwnUHkSlk9wDYCOX3u1vwAq5NBohGpfus',
        salt: 'MypSs9ahrL02kDdBLtY17py52XUOhc9A',
        resetToken: '',
        resetTokenExpiration: null,
        __v: 0,
      },
    });

    userService.get(mockUserID).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data.type).toEqual(0);
      expect(res.data.firstname).toEqual('Brian');
      expect(res.data.suspended).toEqual(false);
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/users?id=${mockUserID}`);
  });

  it('should return an appropriate error if an invalid ID is supplied', (done) => {
    const mockUserID = '322526543030303034313235';

    fetchMock.get(`${API_URL}/api/users?id=${mockUserID}`, {
      status: 500,
      message: "Couldn't find a user matching the requested ID",
    });

    userService.get(mockUserID).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual(
        "Couldn't find a user matching the requested ID"
      );
      done();
    });
    expect(fetchMock).toHaveGot(`${API_URL}/api/users?id=${mockUserID}`);
  });

  ////////////////////////////////////////
  // SUBSCRIBE
  ////////////////////////////////////////
  it('should subscribe a user to an event', (done) => {
    const mockUserID = '322526543030303034313235';
    const mockEventID = '316326543030303034323630';

    fetchMock.post(`${API_URL}/api/user/subscribe`, {
      status: 200,
      message: 'Subscription successful',
    });

    userService.subscribe(mockUserID, mockEventID).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.message).toEqual('Subscription successful');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/subscribe`);
  });

  it('should return an appropriate error if the event cannot be found', (done) => {
    const mockUserID = '322526543030303034313235';
    const mockEventID = '1111111111111111111111111';

    fetchMock.post(`${API_URL}/api/user/subscribe`, {
      status: 500,
      message: 'Failed to subscribe: Could not find the specifed event',
    });

    userService.subscribe(mockUserID, mockEventID).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual(
        'Failed to subscribe: Could not find the specifed event'
      );
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/subscribe`);
  });

  ////////////////////////////////////////
  // UNSUBSCRIBE
  ////////////////////////////////////////
  it('should unsubscribe a user from an event', (done) => {
    const mockUserID = '311526543030403034313234';
    const mockEventID = '323526543030302034323231';

    fetchMock.post(`${API_URL}/api/user/unsubscribe`, {
      status: 200,
      message: 'Unsubscription successful',
    });

    userService.unsubscribe(mockUserID, mockEventID).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.message).toEqual('Unsubscription successful');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/unsubscribe`);
  });

  it('should return an appropriate error if the user cannot be found', (done) => {
    const mockUserID = '322426543030403034313234';
    const mockEventID = '314526543030302034322830';

    fetchMock.post(`${API_URL}/api/user/unsubscribe`, {
      status: 500,
      message: 'Failed to unsubsribe: Could not find the specifed user',
    });

    userService.unsubscribe(mockUserID, mockEventID).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual(
        'Failed to unsubsribe: Could not find the specifed user'
      );
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/unsubscribe`);
  });

  ////////////////////////////////////////
  // UPDATE
  ////////////////////////////////////////
  const mockUserID = '325553523030303030303044';
  const mockUserUpdateData = {
    emailConsent: true,
    verified: false,
    email: 'aliqsam.arcu@loboratum.com',
  };

  it("should update a user's details", (done) => {
    fetchMock.patch(`${API_URL}/api/users`, {
      status: 204,
      message: null,
    });

    userService.update(mockUserID, mockUserUpdateData).then((res) => {
      expect(res.status).toEqual(204);
      expect(res.message).toBeNull();
      done();
    });
    expect(fetchMock).toHavePatched(`${API_URL}/api/users`);
  });

  it('should return an appropriate error if an error occurs during updating', (done) => {
    fetchMock.patch(`${API_URL}/api/users`, {
      status: 500,
      message: 'Failed to update user',
    });

    userService.update(mockUserID, mockUserUpdateData).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('Failed to update user');
      done();
    });
    expect(fetchMock).toHavePatched(`${API_URL}/api/users`);
  });

  ////////////////////////////////////////
  // FORGOT PASSWORD
  ////////////////////////////////////////
  const mockUserEmail = 'johndoe@gmail.com';

  it('should send a password reset email to the user', (done) => {
    fetchMock.post(`${API_URL}/api/user/forgot-password`, {
      status: 204,
      message: null,
    });

    userService.forgotPassword(mockUserEmail).then((res) => {
      expect(res.status).toEqual(204);
      expect(res.message).toBeNull();
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/forgot-password`);
  });

  it('should return an appropriate error if an error occours sending the email', (done) => {
    fetchMock.post(`${API_URL}/api/user/forgot-password`, {
      status: 500,
      message: 'Failed to send reset password reset email',
    });

    userService.forgotPassword(mockUserEmail).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('Failed to send reset password reset email');
      done();
    });
    expect(fetchMock).toHavePosted(`${API_URL}/api/user/forgot-password`);
  });

  ////////////////////////////////////////
  // RESET PASSWORD
  ////////////////////////////////////////
  const mockToken = '9b5a1778d5fe985183aa7b1e31eff92696a51f74';
  const mockPassword = 'SecurePass123!';

  it("should reset the user's password", (done) => {
    fetchMock.patch(`${API_URL}/api/user/reset-password`, {
      status: 200,
      message: 'Password successfully updated',
    });

    userService.resetPassword(mockToken, mockPassword).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.message).toEqual('Password successfully updated');
      done();
    });
    expect(fetchMock).toHavePatched(`${API_URL}/api/user/reset-password`);
  });

  it('should return an appropriate error if an error occours during password reset', (done) => {
    fetchMock.patch(`${API_URL}/api/user/reset-password`, {
      status: 500,
      message: 'Error resetting password',
    });

    userService.resetPassword(mockToken, mockPassword).then((res) => {
      expect(res.status).toEqual(500);
      expect(res.message).toEqual('Error resetting password');
      done();
    });
    expect(fetchMock).toHavePatched(`${API_URL}/api/user/reset-password`);
  });

  ////////////////////////////////////////
  // DELETE USER
  ////////////////////////////////////////
  const mockDeleteUserID = '315253523030303030303241';

  it('should delete the user', (done) => {
    fetchMock.delete(`${API_URL}/api/users`, {
      status: 204,
      message: null,
    });

    userService.deleteUser(mockDeleteUserID).then((res) => {
      expect(res.status).toEqual(204);
      expect(res.message).toBeNull();
      done();
    });
    expect(fetchMock).toHaveDeleted(`${API_URL}/api/users`);
  });

  it('should return an appropriate error if no userID is supplied for user deletion', (done) => {
    fetchMock.delete(`${API_URL}/api/users`, {
      status: 400,
      message: 'Failed to delete user: No email specified',
    });

    userService.deleteUser(mockDeleteUserID).then((res) => {
      expect(res.status).toEqual(400);
      expect(res.message).toEqual('Failed to delete user: No email specified');
      done();
    });
    expect(fetchMock).toHaveDeleted(`${API_URL}/api/users`);
  });
});
