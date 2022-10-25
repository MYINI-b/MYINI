import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import ERDPage from './ERDPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/erd" element={<ERDPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
