import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BusinessErrors } from '../utils/businessErrors.js';

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: BusinessErrors.EMAIL_ALREADY_REGISTERED });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash password
//     console.log('Password before hash:', password);
// const hashedPassword = await bcrypt.hash(password, 10);
// console.log('Password after hash:', hashedPassword);

    // Create user
    const newUser = await User.create({ name, email, password: password });

    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('req.login--------', req.body)

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
console.log('Request password:', `"${password}"`);
console.log('Stored hash:', `"${user.password}"`);
console.log('Length of hash:', user.password.length);
    // Compare password
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    console.log('first', isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '2h' }
    );

    // Return user info + token
    return res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
