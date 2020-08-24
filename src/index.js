import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from 'redux/reducers/index'

const store = createStore(rootReducer)

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider maxSnack={5}>
          <App />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);
serviceWorker.unregister();
