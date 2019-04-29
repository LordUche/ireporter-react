import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux/store';

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
