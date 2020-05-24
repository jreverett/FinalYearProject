import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmationModal from './ConfirmationModal';

describe('<ConfirmationModal />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<ConfirmationModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
