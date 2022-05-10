import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import './App.css';
import { UserContext } from '../utils/contexts';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.StrictMode>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </React.StrictMode>
  );
}
