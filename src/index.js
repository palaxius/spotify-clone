import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {DataLayer} from './DataLayer'
import reducer, {initialState} from "./reducer";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('root')
);

