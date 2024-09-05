import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/slices/tasksSlice';
import { createAuthAxios } from '../axios';
import TaskModal from './TaskModal';
import TaskEditModal from './TaskEditModal';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error, pagination } = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authAxios = createAuthAxios(token);
        const response = await authAxios.get('/api/tasks', {
          params: {
            page,
            limit,
            search,
            status: statusFilter,
            priority: priorityFilter,
            dueDate: startDate && endDate ? `${startDate.toISOString()},${endDate.toISOString()}` : '',
          }
        });
  
        console.log('Response Data:', response.data);
  
        if (response.data && Array.isArray(response.data.tasks)) {
          dispatch(fetchTasks({
            page,
            limit,
            search,
            status: statusFilter,
            priority: priorityFilter,
            dueDate: startDate && endDate ? `${startDate.toISOString()},${endDate.toISOString()}` : '',
          }));
        } else {
          console.error('Expected an array of tasks but received:', response.data.tasks);
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };
  
    fetchData();
  }, [dispatch, token, page, limit, search, statusFilter, priorityFilter, startDate, endDate]);

  if (!tasks || !Array.isArray(tasks)) {
    console.error('Tasks data is invalid:', tasks);
    return <div>Error: Tasks data is invalid.</div>;
  }

  const handleView = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(taskId));
        setAlertSeverity('success');
        setAlertMessage('Task deleted successfully');
        setAlertOpen(true);
      } catch (error) {
        setAlertSeverity('error');
        setAlertMessage('Delete failed: ' + error.message);
        setAlertOpen(true);
      }
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const totalPages = Math.ceil((pagination?.total || 0) / limit);

  return (
    <div className="relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-1 border border-gray-300 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-1 border border-gray-300 rounded ml-2"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="p-1 border border-gray-300 rounded ml-2 mr-2"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
       
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            dateFormat="yyyy-MM-dd"
            className="p-1 border border-gray-300 rounded"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            dateFormat="yyyy-MM-dd"
            className="p-1 border border-gray-300 rounded ml-2"
          />
       
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Person</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignedPerson}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleView(task)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <FaEye size={20} />
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  className="text-green-600 hover:text-green-900 ml-4"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
          className="p-2 bg-gray-300 text-gray-700 rounded"
        >
          Previous
        </button>
        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="p-2 bg-gray-300 text-gray-700 rounded"
          >
            Next
          </button>
        )}
      </div>
      {showModal && <TaskModal task={selectedTask} onClose={() => setShowModal(false)} />}
      {showEditModal && <TaskEditModal task={selectedTask} onClose={() => setShowEditModal(false)} />}
      
      
      <Link
        to="/add-task"
        className="fixed bottom-10 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <FaPlus size={20} />
      </Link>

     
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

export default TaskList;
