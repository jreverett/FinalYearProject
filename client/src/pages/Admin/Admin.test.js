import React from 'react';
import renderer from 'react-test-renderer';
import Admin from './Admin';

describe('<Admin />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Admin />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
