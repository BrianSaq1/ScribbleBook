const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  scribbleTitle: String,
  scribbleDescription: String,
  userId: String,
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;