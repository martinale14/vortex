import React, {createContext} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';

import './App.css';
import SprintModal from '../components/sprintModal/SprintModal';
import StoryModal from '../components/storyModal/StoryModal';

export default function App() {

  const userContext = createContext({})
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/modalEJ' element={<SprintModal/>} />
          <Route path='/modalEJ2' element={<StoryModal/>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
