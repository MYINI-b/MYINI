import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import Onboarding from './Onboarding';
import Requirement from './Requirement';
import SettingPage from './Setting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {' '}
        <Route path="/" element={<Onboarding />} />
        <Route path="/requirement" element={<Requirement />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
