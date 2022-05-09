import React, { useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';

import './App.css';
import { UserContext } from '../utils/contexts';
export default function App() {

  const [user, setUser] : [{[key:string]:any}, any]= useState({});


  return (
    <React.StrictMode>
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            {user.id !== undefined ? <Route path='/' element={<Home />} /> : <Route path='/' element={<Login />} />}
            {/* <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} /> */}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    
    </React.StrictMode>
  );
}
