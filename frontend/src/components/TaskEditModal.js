import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/slices/tasksSlice';
import { Snackbar, Alert } from '@mui/material';

const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseDateForStorage = (dateString) => {
  // Converts date string from `yyyy-MM-dd` to ISO format
  if (!dateString) return '';
  return new Date(dateString).toISOString();
};

const TaskEditModal = ({ task, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Convert dueDate to ISO format before saving
      const taskToUpdate = { ...editedTask, dueDate: parseDateForStorage(editedTask.dueDate) };
      await dispatch(updateTask(taskToUpdate));
      setAlertSeverity('success');
      setAlertMessage('Task updated successfully');
      setAlertOpen(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Update failed: ' + error.message);
      setAlertOpen(true);
    }
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md z-50 relative">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Assigned Person</label>
          <input
            type="text"
            name="assignedPerson"
            value={editedTask.assignedPerson}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formatDateForInput(editedTask.dueDate)}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>

      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TaskEditModal;
