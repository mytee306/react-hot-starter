import * as RTL from '@testing-library/react';
import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';
import Provider from './Provider';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider>
        <App />
      </Provider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test('App Name', () => {
    const { getByText } = RTL.render(<App />);
    expect(getByText('App Name')).toBeInTheDocument();
  });
});
