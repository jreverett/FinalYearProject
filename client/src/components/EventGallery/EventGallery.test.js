import React from 'react';
import renderer from 'react-test-renderer';
import EventGallery from './EventGallery';

describe('<EventGallery />', () => {
  it('matches the snapshot', () => {
    const testEvents = [];
    const tree = renderer.create(<EventGallery events={testEvents} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
