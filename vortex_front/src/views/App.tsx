import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import './App.css';
import { UserContext } from '../utils/contexts';
import Table from '../components/table/Table';
import Profile from '../components/profile/Profile';
import TableUsers from '../components/tableUsers/TableUsers';
import TableTemplate from '../components/tableTemplate/TableTemplate';
import ProjectTable from '../components/ProjectTable/ProjectTable';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />}>
            <Route path='' element={<Table />} />
            <Route path='project/:projectId' element={<ProjectTable />} />
            <Route path='templates' element={<TableTemplate />} />
            <Route path='admin' element={<TableUsers />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          duration: 3000,
          style: { background: 'white', color: '#008f82' },
          success: {
            iconTheme: { primary: '#008f82', secondary: 'white' }
          },
          error: {
            style: { color: '#ff9312' },
            iconTheme: { primary: '#ff9312', secondary: 'white' }
          }
        }}
      />
    </UserContext.Provider>
  );
}
