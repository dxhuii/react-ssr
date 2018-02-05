import React from 'react';
import { hydrate, render } from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import Loadable from 'react-loadable';
import app from './app';

const initialState = window && window.__INITIAL_STATE__;
const history = createHistory();
const { configureStore, createApp } = app;
const store = configureStore(initialState);

const renderApp = () => {
  const application = createApp({ store, history });
  const renderMethed = process.env.NODE_ENV === 'development' && module.hot ? render : hydrate;
  renderMethed(application, document.getElementById('root'));
}

window.main = () => {
  Loadable.preloadReady().then(() => {
    renderApp();
  });
};

if(process.env.NODE_ENV === 'development'){
  if(module.hot) {
    const newReducer = require('./store/reducers/index.js');
    module.hot.accept('./store/reducers/index.js', () => {
      store.replaceReducer(newReducer)
    })
    module.hot.accept('./app/index.js', () => {
      const { createApp } = require('./app/index.js');
      store.replaceReducer(newReducer);
      const application = createApp({ store, history });
      hydrate(application, document.getElementById('root'));
    })
  }
}