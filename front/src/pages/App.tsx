import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import ERDPage from './ERDPage';
import Requirement from './Requirement';
import ApiSpec from './ApiSpec';
import SettingPage from './Setting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/erd" element={<ERDPage />} />
        <Route path="/requirement" element={<Requirement />} />
        <Route path="/apispec" element={<ApiSpec />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
