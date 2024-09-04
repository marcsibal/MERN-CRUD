import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { setCredentials } from '../redux/slices/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/users/login', values);
        dispatch(setCredentials({ token: response.data.token }));
        navigate('/add-task')
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
