import React from 'react';
import renderer from 'react-test-renderer';
import SubscriptionRow from './SubscriptionRow';

describe('<SubscriptionRow />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<SubscriptionRow />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
