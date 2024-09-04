import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const Register = () => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('/api/users/register', values);
        alert('Registration successful');
      } catch (error) {
        console.error('Registration failed', error);
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
