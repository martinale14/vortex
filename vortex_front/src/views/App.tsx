import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';

import './App.css';
import ProjectModal from '../components/projectModal/projectModal';

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/test' element={<ProjectModal />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
