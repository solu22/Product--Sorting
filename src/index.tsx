import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { StateProvider, reducer } from './state';


ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer= {reducer}>
        <App />
    </StateProvider>
  
  </React.StrictMode>,
  document.getElementById('root')
);


