import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import Onboarding from './Onboarding';
import Requirement from './Requirement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {' '}
        <Route path="/" element={<Onboarding />} />
        <Route path="/requirement" element={<Requirement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
