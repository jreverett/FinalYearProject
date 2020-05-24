import React from 'react';
import renderer from 'react-test-renderer';
import UserAdminRow from './UserAdminRow';

describe('<UserAdminRow />', () => {
  it('matches the snapshot', () => {
    const testUser = {
      type: 0,
    };
    const tree = renderer.create(<UserAdminRow user={testUser} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
