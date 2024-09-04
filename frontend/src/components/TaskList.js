import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/slices/tasksSlice';
import { createAuthAxios } from '../axios'; // Correct import
import TaskModal from './TaskModal'; 

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.token); // Get token from state
  const authAxios = createAuthAxios(token); // Pass the token to createAuthAxios

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authAxios.get('/api/tasks');
        dispatch(fetchTasks(response.data));
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };
    fetchData();
  }, [dispatch, authAxios]);

  const handleView = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>{error}</div>;

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleView(task)} className="text-blue-600 hover:text-blue-900">View</button>
                <button onClick={() => handleEdit(task)} className="text-green-600 hover:text-green-900 ml-4">Edit</button>
                <button onClick={() => handleDelete(task._id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <TaskModal task={selectedTask} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TaskList;
