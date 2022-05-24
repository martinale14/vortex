import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import './App.css';
import { UserContext } from '../utils/contexts';
import Table from '../components/table/Table';
import TableAdministration from '../components/tableAdministration/TableAdministration';
import Profile from '../components/profile/Profile';
import TableUsers from '../components/tableUsers/TableUsers';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />}>
            <Route path='' element={<Table />} />
            <Route path='templates' element={<Table />} />
            <Route path='admin' element={<TableUsers />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
