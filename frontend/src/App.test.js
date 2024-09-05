import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import TaskList from './components/TaskList';
import tasksReducer from './redux/slices/tasksSlice';
import authReducer from './redux/slices/authSlice';

// Mock the Redux store
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer
  },
  preloadedState: {
    tasks: {
      tasks: [
        { _id: '1', title: 'Test Task', description: 'Test Description', dueDate: '2024-12-31', priority: 'Low', status: 'Completed', assignedPerson: 'TestPerson' }
      ],
      pagination: { total: 1, page: 1, limit: 10 },
    },
    auth: {
      token: 'mock-token'
    }
  }
});

describe('TaskList Component', () => {
  test('filters tasks based on search input', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TaskList />
        </MemoryRouter>
      </Provider>
    );

    // Find the search input using a simpler query
    const searchInput = container.querySelector('input[placeholder="Search..."]');

    if (searchInput) {
      // Fire the change event on the input field
      fireEvent.change(searchInput, { target: { value: 'Test Task' } });

      // Check if the filtered task is visible
      expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
    } else {
      throw new Error('Search input not found');
    }
  });
});
