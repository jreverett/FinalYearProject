import React from 'react';
import renderer from 'react-test-renderer';
import SendAnnouncement from './SendAnnouncement';

describe('<SendAnnouncement />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<SendAnnouncement />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
