import React from 'react';
import renderer from 'react-test-renderer';
import EventModal from './EventModal';

describe('<EventModal />', () => {
  it('matches the snapshot', () => {
    const testEvent = {
      start: '2030-01-01T12:34:56.000+00:00',
      subscribers: [],
      images: [],
    };
    const tree = renderer
      .create(<EventModal eventDetails={testEvent} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
