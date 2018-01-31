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
  const renderMethed = process.env.NODE_ENV === 'development' && module.hot ? render : hydrate
  renderMethed(application, document.getElementById('root'));
}

window.main = () => {
  NProgress.start();
  Loadable.preloadReady().then(() => {
    renderApp();
    NProgress.done();
  });
};

if(process.env.NODE_ENV === 'development'){
  if(module.hot){
    module.hot.accept('./store/reducers/index.js', () => {
      const newReducer = require('./store/reducers/index.js');
      store.replaceReducer(newReducer)
      /*import('./store/reducers/index.js').then(({default:module})=>{
        store.replaceReducer(module)
      })*/
    })
    module.hot.accept('./app/index.js', () => {
      const { createApp } = require('./app/index.js');
      const newReducer = require('./store/reducers/index.js');
      store.replaceReducer(newReducer);
      const application = createApp({ store, history });
      hydrate(application, document.getElementById('root'));
      /*import('./app/index.js').then(({default:module})=>{
        let {createApp}=module;
        import('./store/reducers/index.js').then(({default:module})=>{
          store.replaceReducer(module)
          let application=createApp({store,history});
          render(application,document.getElementById('root'));
        })
      })*/
    })
  }
}