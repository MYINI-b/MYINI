import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import Onboarding from './Onboarding';
import Requirement from './Requirement';
import ApiSpec from './ApiSpec';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {' '}
        <Route path="/" element={<Onboarding />} />
        <Route path="/requirement" element={<Requirement />} />
        <Route path="/apispec" element={<ApiSpec />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
