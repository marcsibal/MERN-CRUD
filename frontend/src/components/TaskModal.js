import React from 'react';

const TaskModal = ({ task, onClose }) => {
  if (!task) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

   
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md z-50 relative">
        <h2 className="text-xl font-semibold mb-4">Task Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{task.title}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{task.description}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">
            {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Priority</label>
          <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{task.priority}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{task.status}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Assigned Person</label>
          <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{task.assignedPerson}</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
