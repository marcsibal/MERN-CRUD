import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAuthAxios } from '../../axios';

export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { getState }) => {
  const token = getState().auth.token;
  const authAxios = createAuthAxios(token);
  const response = await authAxios.post('/api/tasks', taskData);
  return response.data;
});

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (params, { getState }) => {
  const token = getState().auth.token;
  const authAxios = createAuthAxios(token);
  const response = await authAxios.get('/api/tasks', { params });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { getState }) => {
  const token = getState().auth.token;
  const authAxios = createAuthAxios(token);
  await authAxios.delete(`/api/tasks/${taskId}`);
  return taskId;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task, { getState }) => {
  const token = getState().auth.token;
  const authAxios = createAuthAxios(token);
  const response = await authAxios.put(`/api/tasks/${task._id}`, task);
  return response.data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    pagination: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload.tasks;
        state.pagination = action.payload.pagination;
      })    
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index >= 0) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
