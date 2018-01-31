import App from './App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';

const defaultState = {
  appName: 'React Conduit',
  articles: null
};

const reducer = function(state = defaultState, action) {
  return state;
};

const store = createStore(reducer);

ReactDOM.render((
  <Provider store={ store }>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
