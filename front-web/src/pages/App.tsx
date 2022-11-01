import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import Onboarding from './Onboarding';
import Docs from './Docs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {' '}
        <Route path="/" element={<Onboarding />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
