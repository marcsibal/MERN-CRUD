import mongoose from 'mongoose';
import { app, server } from '../server.js'; 
import request from 'supertest';
import chai from 'chai';
import Task from '../models/Task.js'; 

const { expect } = chai;

// Connect to test database before running tests
before(async function () {
  if (mongoose.connection.readyState === 0) { // 0 = disconnected
    try {
      console.log('Attempting to connect to the test database...');
      await mongoose.connect('mongodb://testUser:testPassword@localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to test database');
    } catch (error) {
      console.error('Error connecting to test database:', error);
      throw error;
    }
  }
});

// Drop the database before each test
beforeEach(async function () {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Dropping the database...');
      await mongoose.connection.db.dropDatabase();
      console.log('Database dropped');
    } else {
      throw new Error('Mongoose connection not established');
    }
  } catch (error) {
    console.error('Error dropping database:', error);
    throw error;
  }
});

// Disconnect after all tests
after(async function () {
  try {
    await mongoose.disconnect();
    server.close();
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
});

describe('Task API', () => {
  let taskId;

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'New Task', description: 'New Description', dueDate: new Date(), priority: 'Medium', user: mongoose.Types.ObjectId() })
      .expect(201);

    taskId = res.body._id; 

    expect(res.body).to.have.property('_id');
    expect(res.body.title).to.equal('New Task');
  });

  it('should update a task', async () => {
    const updatedTask = { title: 'Updated Task', description: 'Updated Description', priority: 'High' };

    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send(updatedTask)
      .expect(200);

    expect(res.body).to.have.property('_id').that.equals(taskId);
    expect(res.body.title).to.equal('Updated Task');
    expect(res.body.description).to.equal('Updated Description');
    expect(res.body.priority).to.equal('High');
  });

  it('should delete a task', async () => {
    await request(app)
      .delete(`/api/tasks/${taskId}`)
      .expect(200);

    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .expect(404);

    expect(res.body).to.have.property('message').that.equals('Task not found');
  });
});
