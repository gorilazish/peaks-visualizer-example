import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Visualizer from './containers/Visualizer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Visualizer />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
