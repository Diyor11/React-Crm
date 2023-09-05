import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import './style/app.scss';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';


import {AppContextProvider } from './context/appContext';
const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Provider store={store}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Provider>
  </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
