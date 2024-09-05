import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/slices/tasksSlice';
import { CalendarIcon, FlagIcon, CheckCircleIcon, PencilSquareIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import bg from '../assets/bg.png';
import { useNavigate } from 'react-router-dom';
import socket from './socket'; // Import the socket instance
import { Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert

const validationSchema = yup.object({
  assignedPerson: yup.string().required('Assigned Person is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.date().required('Due Date is required'),
  priority: yup.string().required('Priority is required'),
  status: yup.string().oneOf(['completed', 'pending']).required('Status is required')
});

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const formik = useFormik({
    initialValues: { assignedPerson: '', title: '', description: '', dueDate: '', priority: 'Medium', status: 'pending' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(createTask(values)).unwrap();
        setAlertSeverity('success');
        setAlertMessage('Task created successfully');
        setAlertOpen(true);
        setTimeout(() => {
          navigate('/tasks');
        }, 1000);
      } catch (error) {
        setAlertSeverity('error');
        setAlertMessage('Creation failed');
        setAlertOpen(true);
      }
    }
  });

  useEffect(() => {
    // Listen for task updates
    socket.on('task_update', (task) => {
      setTasks(prevTasks => [...prevTasks, task]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('task_update');
    };
  }, []);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">Add Task</h1>
          <form onSubmit={formik.handleSubmit}>
            <h4>Assigned Person</h4>
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <input
                id="assignedPerson"
                name="assignedPerson"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.assignedPerson}
                placeholder="Assigned Person"
                className="w-full p-2 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.assignedPerson ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.assignedPerson}</div>
            ) : null}
            <h4>Title</h4>
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <PencilSquareIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Title"
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.title ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
            ) : null}
            <h4>Description</h4>
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <DocumentTextIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Description"
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            ) : null}
            <h4>Due Date</h4>
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <CalendarIcon className="w-6 h-6 text-gray-500 ml-3" />
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.dueDate}
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              />
            </div>
            {formik.errors.dueDate ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.dueDate}</div>
            ) : null}
            <h4>Priority</h4>
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <FlagIcon className="w-6 h-6 text-gray-500 ml-3" />
              <select
                id="priority"
                name="priority"
                onChange={formik.handleChange}
                value={formik.values.priority}
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            {formik.errors.priority ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.priority}</div>
            ) : null}
            <h4>Status</h4>
            <div className="mb-4 flex items-center border border-gray-300 rounded">
              <CheckCircleIcon className="w-6 h-6 text-gray-500 ml-3" />
              <select
                id="status"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
                className="w-full p-2 pl-10 border-none rounded focus:ring-0"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {formik.errors.status ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.status}</div>
            ) : null}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => navigate('/tasks')}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>

      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TaskForm;
