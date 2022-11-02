import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import ProjectManage from './ProjectManage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/projectmanage" element={<ProjectManage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
