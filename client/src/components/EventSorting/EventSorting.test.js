import React from 'react';
import renderer from 'react-test-renderer';
import EventSorting from './EventSorting';

describe('<EventSorting />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<EventSorting />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
