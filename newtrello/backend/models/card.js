const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  list: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  labels: [String],
  dueDate: Date,
}, {
  timestamps: true, // This enables automatic creation of createdAt and updatedAt fields
});

module.exports = mongoose.model('Card', cardSchema);
