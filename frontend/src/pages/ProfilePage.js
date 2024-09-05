import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCircleIcon, UserIcon, AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/solid';
import bg from '../assets/bg.png'; 
import { useNavigate } from 'react-router-dom'; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);

        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">Profile</h1>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <UserCircleIcon className="w-6 h-6 text-gray-500 ml-3" />
            <p className="w-full p-2 pl-10 border-none rounded">Username: {profile.username}</p>
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <UserIcon className="w-6 h-6 text-gray-500 ml-3" />
            <p className="w-full p-2 pl-10 border-none rounded">First Name: {profile.firstName}</p>
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <UserIcon className="w-6 h-6 text-gray-500 ml-3" />
            <p className="w-full p-2 pl-10 border-none rounded">Last Name: {profile.lastName}</p>
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <AtSymbolIcon className="w-6 h-6 text-gray-500 ml-3" />
            <p className="w-full p-2 pl-10 border-none rounded">Email: {profile.email}</p>
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <PhoneIcon className="w-6 h-6 text-gray-500 ml-3" />
            <p className="w-full p-2 pl-10 border-none rounded">Contact: {profile.contact}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate('/tasks')} 
              className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
