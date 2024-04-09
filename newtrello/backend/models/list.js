// /backend/models/List.js

const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Board',
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
  }],
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);
