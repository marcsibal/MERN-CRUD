import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, default: 'pending' },
  assignedPerson: { type: String, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
