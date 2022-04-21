import React, {createContext} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';

import './App.css';

export default function App() {

  const userContext = createContext({})
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
