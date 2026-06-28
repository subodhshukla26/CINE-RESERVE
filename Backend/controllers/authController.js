import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const isDbReady = () => mongoose.connection.readyState === 1;

const buildUserResponse = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
});

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!isDbReady()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please try again later.',
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists.',
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error('Password hashing error:', hashError);

      return res.status(500).json({
        success: false,
        message: 'Unable to register user.',
      });
    }

    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        ...buildUserResponse(user),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Signup controller error:', error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error.'
          : error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!isDbReady()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please try again later.',
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'JWT secret is not configured on the server.',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.error('Login controller error:', error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error.'
          : error.message,
    });
  }
};

export const profile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Profile fetched successfully.',
    user: req.user,
  });
};
