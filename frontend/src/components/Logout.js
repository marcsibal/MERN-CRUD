import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page 
  };

  return (
    <button
    onClick={handleLogout}
    className="text-gray-800 hover:text-gray-600" 
  >
      Logout
    </button>
  );
};

export default Logout;
