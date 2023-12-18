const express = require('express');
const User = require('../models/user');
const Drawing = require('../models/drawingModel');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the password is correct (you should use a proper authentication method here)
      if (existingUser.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      // Login successful
      res.status(200).json({ message: 'Login successful', user: existingUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password, // Note: In a real-world scenario, you should hash the password before saving it.
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/save-drawing', async (req, res) => {
    try {
      // Extract drawing data from the request body
      const { title, description, imageData } = req.body;
  
      // Create a new Drawing document in the database
      const newDrawing = new DrawingModel({
        title,
        description,
        imageData,
        userId: req.user.id, // Assuming you have a user ID available in req.user
      });
  
      // Save the drawing to the database
      const savedDrawing = await newDrawing.save();
  
      // Respond with success message or savedDrawing details
      res.json({ message: 'Drawing saved successfully', drawing: savedDrawing });
    } catch (error) {
      console.error('Error saving drawing:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;