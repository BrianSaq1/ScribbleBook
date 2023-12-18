const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the signup route
const Drawing = require('./models/drawingModel'); // Import the Drawing model

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Project:Hello@cluster0.fp9rd4a.mongodb.net/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use the signup route
app.use('/auth', authRoutes);

// Save-drawing route
app.post('/save-drawing', async (req, res) => {
    try {
      const { scribbleTitle, scribbleDescription, userId } = req.body;
  
      // Create a new drawing instance
      const newDrawing = new Drawing({
        scribbleTitle,
        scribbleDescription,
        userId,
      });
  
      // Save the drawing to MongoDB
      await newDrawing.save();
  
      // Respond with success
      res.status(200).json({ message: 'Drawing saved successfully' });
    } catch (error) {
      console.error('Error saving drawing:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});