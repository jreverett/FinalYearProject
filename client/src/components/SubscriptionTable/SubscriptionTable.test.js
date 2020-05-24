import React from 'react';
import renderer from 'react-test-renderer';
import SubscriptionTable from './SubscriptionTable';

describe('<SubscriptionTable />', () => {
  it('matches the snapshot', () => {
    const testUser = { ownedEvents: [] };
    const tree = renderer
      .create(<SubscriptionTable loggedInUser={testUser} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
