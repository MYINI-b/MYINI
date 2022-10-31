import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import ERDPage from './ERDPage';
import Requirement from './Requirement';
import SettingPage from './Setting';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/erd" element={<ERDPage />} />
        <Route path="/requirement" element={<Requirement />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
