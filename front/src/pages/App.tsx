import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import Onboarding from './Onboarding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {' '}
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
