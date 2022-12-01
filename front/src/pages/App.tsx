import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './global.scss';
import LoginPage from './User/LoginPage';
import MainPage from './MainPage';
import ProjectManage from './ProjectManage';
import Social from './User/Social';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/social/redirect" element={<Social />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/project/:pid" element={<ProjectManage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
