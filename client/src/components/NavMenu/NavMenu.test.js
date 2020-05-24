import React from 'react';
import renderer from 'react-test-renderer';
import NavMenu from './NavMenu';

describe('<NavMenu />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<NavMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
