import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './global.scss';
import Onboarding from './Onboarding';
import Docs from './Docs';
import License from './License';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {' '}
        <Route path="/" element={<Onboarding />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/license" element={<License />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
