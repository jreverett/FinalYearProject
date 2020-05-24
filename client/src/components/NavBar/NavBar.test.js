import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from './NavBar';

describe('<NavBar />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<NavBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
