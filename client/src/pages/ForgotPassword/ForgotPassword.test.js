import React from 'react';
import renderer from 'react-test-renderer';
import ForgotPassword from './ForgotPassword';

describe('<ForgotPassword />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<ForgotPassword />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
