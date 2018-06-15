import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Visualizer from './Visualizer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Visualizer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
