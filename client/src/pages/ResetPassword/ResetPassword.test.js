import React from 'react';
import renderer from 'react-test-renderer';
import ResetPassword from './ResetPassword';

describe('<ResetPassword />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<ResetPassword />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
