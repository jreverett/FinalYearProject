import React from 'react';
import renderer from 'react-test-renderer';
import MyEventsTable from './MyEventsTable';

describe('<MyEventsTable />', () => {
  it('matches the snapshot', () => {
    const testUser = { ownedEvents: [] };
    const tree = renderer
      .create(<MyEventsTable loggedInUser={testUser} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
