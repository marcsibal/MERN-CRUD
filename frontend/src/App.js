import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Home from './pages/HomePage';
import Navbar from './components/navbar'; 
import Profile from './pages/ProfilePage';
import Logout from './components/Logout';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      {token && <Navbar />}
      <main className="p-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route path="/tasks" element={<PrivateRoute element={TaskList} />} />
          <Route path="/add-task" element={<PrivateRoute element={TaskForm} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
