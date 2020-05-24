import React from 'react';
import renderer from 'react-test-renderer';
import EventAdminRow from './EventAdminRow';
import moment from 'moment';

describe('<EventAdminRow />', () => {
  it('matches the snapshot', () => {
    const testEvent = {
      _id: '12345',
      title: 'Test Title',
      start: '2030-01-01T12:34:56.000+00:00',
    };
    const tree = renderer.create(<EventAdminRow event={testEvent} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
