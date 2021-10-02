import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css'

ReactDOM.render(
  <React.StrictMode>
    <App store = {store} />
  </React.StrictMode>,
  document.getElementById('root')
);