import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/slices/tasksSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleUpdate = () => {
    dispatch(updateTask({ id: task._id, taskData: { ...task, status: 'completed' } }));
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleUpdate}>Complete</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
