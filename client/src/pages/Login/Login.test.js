import React from 'react';
import renderer from 'react-test-renderer';
import Login from './Login';

describe('<Login />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
