import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createTask } from '../redux/slices/tasksSlice';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.date().required('Due Date is required'),
  priority: yup.string().required('Priority is required'),
  status: yup.string().oneOf(['completed', 'pending']).required('Status is required')
});

const TaskForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { title: '', description: '', dueDate: '', priority: 'Medium', status: 'pending' },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createTask(values));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title ? <div>{formik.errors.title}</div> : null}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description ? <div>{formik.errors.description}</div> : null}
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.dueDate}
        />
        {formik.errors.dueDate ? <div>{formik.errors.dueDate}</div> : null}
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          onChange={formik.handleChange}
          value={formik.values.priority}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {formik.errors.priority ? <div>{formik.errors.priority}</div> : null}
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          onChange={formik.handleChange}
          value={formik.values.status}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        {formik.errors.status ? <div>{formik.errors.status}</div> : null}
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
