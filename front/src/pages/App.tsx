import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'modules/Reducers';

import './global.scss';
import LoginPage from './User/LoginPage';
import MainPage from './MainPage';
import ProjectManage from './ProjectManage';
import Social from './User/Social';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/social/redirect" element={<Social />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/project/:pid" element={<ProjectManage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
