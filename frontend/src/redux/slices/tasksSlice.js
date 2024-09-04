import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
  const { auth } = getState();
  const response = await axios.get('/api/tasks', { headers: { Authorization: `Bearer ${auth.token}` } });
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { getState }) => {
  const { auth } = getState();
  const response = await axios.post('/api/tasks', taskData, { headers: { Authorization: `Bearer ${auth.token}` } });
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, taskData }, { getState }) => {
  const { auth } = getState();
  const response = await axios.put(`/api/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${auth.token}` } });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { getState }) => {
  const { auth } = getState();
  await axios.delete(`/api/tasks/${id}`, { headers: { Authorization: `Bearer ${auth.token}` } });
  return id;
});

// Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  }
});

export default tasksSlice.reducer;
