import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { UserCircleIcon, UserIcon, LockClosedIcon, AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/solid';
import bg from '../assets/bg.png';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  contact: yup.string().required('Contact number is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
});

const Register = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('success');
  const [alertMessage, setAlertMessage] = React.useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleClose = () => {
    setAlertOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      contact: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('/api/users/register', values);
        setAlertSeverity('success');
        setAlertMessage('Registration successful');
        setAlertOpen(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } catch (error) {
        setAlertSeverity('error');
        setAlertMessage('Registration failed: ' + error.message);
        setAlertOpen(true);
        console.error('Registration failed', error);
      }
    }
  });

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
          <p className="text-sm mb-4 text-center">Please Enter Your Details</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <UserIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                placeholder="First Name"
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.firstName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
            ) : null}
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <UserIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="Last Name"
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.lastName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
            ) : null}
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <PhoneIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="contact"
                name="contact"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.contact}
                placeholder="Contact"
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.contact ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.contact}</div>
            ) : null}
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <AtSymbolIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Email"
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}

            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <UserCircleIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.username ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
            ) : null}

            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <LockClosedIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}

            <div className="flex justify-between items-center mb-4">
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Register
              </button>
            </div>
            <p className="text-sm text-gray-600 flex justify-end">
              <span>Already have an account?</span>
              <a href="/login" className="text-blue-500 hover:underline ml-1">Login</a>
            </p>
          </form>

          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={alertSeverity}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Register;
