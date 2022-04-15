import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';

import './App.css';

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
