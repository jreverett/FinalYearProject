import React from 'react';
import renderer from 'react-test-renderer';
import EventTile from './EventTile';

describe('<EventTile />', () => {
  it('matches the snapshot', () => {
    const testEvent = {
      address: { description: 'Test Lane' },
      start: '2030-01-01T12:34:56.000+00:00',
      subscribers: [],
      images: [],
    };
    const tree = renderer
      .create(<EventTile eventDetails={testEvent} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
