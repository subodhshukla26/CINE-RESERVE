import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

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
      email,
      password: hashedPassword,
    });

    const createdUser = user.toObject();
    const userResponse = {
      _id: createdUser._id,
      fullName: createdUser.fullName,
      email: createdUser.email,
      role: createdUser.role,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: userResponse,
    });
  } catch (error) {
    console.error('Signup controller error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
    });
  }
  console.log(req.body);
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

    const loggedInUser = user.toObject();
    const userResponse = {
      _id: loggedInUser._id,
      fullName: loggedInUser.fullName,
      email: loggedInUser.email,
      role: loggedInUser.role,
    };

    const token = jwt.sign(
      {
        userId: loggedInUser._id,
        email: loggedInUser.email,
        role: loggedInUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Login controller error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
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
