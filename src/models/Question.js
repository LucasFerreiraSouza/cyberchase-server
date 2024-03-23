const mongoose = require('mongoose')


const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  options: { type: [String], required: true },
  correctOptionIndex: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Question', questionSchema)

