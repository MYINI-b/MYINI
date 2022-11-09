import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'modules/Reducers';

import './global.scss';
import LoginPage from './User/LoginPage';
import MainPage from './MainPage';
import ProjectManage from './ProjectManage';
import Social from './User/Social';
import TestPage from './TestPage';

function App() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/social/redirect" element={<Social />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/projectmanage/:pid" element={<ProjectManage />} />
          <Route path="/test1" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
