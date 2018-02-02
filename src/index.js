import React from 'react';
import { hydrate, render } from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import Loadable from 'react-loadable';
import NProgress from 'nprogress';
import './assets/css/nprogress.scss';
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
  NProgress.start(); // 进度条开始
  Loadable.preloadReady().then(() => {
    renderApp();
    NProgress.done(); // 进度条结束
  });
};

if(process.env.NODE_ENV === 'development'){
  if(module.hot) {
    module.hot.accept('./store/reducers/index.js', () => {
      const newReducer = require('./store/reducers/index.js');
      store.replaceReducer(newReducer)
    })
    module.hot.accept('./app/index.js', () => {
      const { createApp } = require('./app/index.js');
      const newReducer = require('./store/reducers/index.js');
      store.replaceReducer(newReducer);
      const application = createApp({ store, history });
      hydrate(application, document.getElementById('root'));
    })
  }
}