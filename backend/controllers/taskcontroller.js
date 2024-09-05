import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {

    const { page = 1, limit = 10, search, status, priority, dueDate } = req.query;
 
    console.log('Query Parameters:', { page, limit, search, status, priority, dueDate });

    const query = {};


    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex }
      ];
    }

  
    if (status) {
      query.status = status;
    }

  
    if (priority) {
      query.priority = priority;
    }

  
    if (dueDate) {
      const [startDate, endDate] = dueDate.split(',').map(date => new Date(date).toISOString());
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      query.dueDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

  
    const totalTasks = await Task.countDocuments(query);


    res.json({
      tasks,
      pagination: {
        total: totalTasks,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(400).json({ message: err.message });
  }
};
