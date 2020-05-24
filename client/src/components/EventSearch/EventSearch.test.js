import React from 'react';
import renderer from 'react-test-renderer';
import EventSearch from './EventSearch';

describe('<EventSearch />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<EventSearch />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
