import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from './Reducer';
import Popup from './Popup';
import './index.css';

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
console.log(store.getState());
render(
  <Provider store={store}>
    {' '}
    <Popup />
  </Provider>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
