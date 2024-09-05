import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import Task from './models/Task';


dotenv.config();

const app = express();
const server = http.createServer(app); 
const io = new SocketIOServer(server, { 
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
}); 

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define socket.io event handlers
io.on('connection', (socket) => {
  console.log('New client connected');

  // Broadcast task updates
  socket.on('task_update', (task) => {
    io.emit('task_update', task);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);



// Handle creating a task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    io.emit('task_update', newTask); // Broadcast new task
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Handle updating a task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    io.emit('task_update', task); // Broadcast updated task
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export app and server for testing
export { app, server };

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
