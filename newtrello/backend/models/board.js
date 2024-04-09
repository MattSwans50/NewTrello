const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  listsOrder: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }],
}, {
  timestamps: true, // Automatically creates createdAt and updatedAt fields
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
