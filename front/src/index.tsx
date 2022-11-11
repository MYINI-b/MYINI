import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'pages/App';
import axios from 'axios';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'modules/Reducers';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer);
const persistor = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
