import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MusicPlayerProvider } from './store/MusicPlayerContext';
const App1 = (
  <MusicPlayerProvider>
    <div className="container">
      <App />
    </div>
  </MusicPlayerProvider>
);

ReactDOM.render(App1, document.getElementById('root'));
