import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<App />, div);
  });
});
