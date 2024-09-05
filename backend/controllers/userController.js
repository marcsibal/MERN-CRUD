import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(404);
    res.json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contact: user.contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, firstName, lastName, email, contact } = req.body;
    const user = new User({ username, password, firstName, lastName, email, contact });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


