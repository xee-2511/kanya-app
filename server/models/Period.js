const mongoose = require('mongoose')

const periodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  cycleLength: {
    type: Number,
    default: 28
  },
  periodDuration: {
    type: Number,
    default: 5
  }
}, { timestamps: true })

module.exports = mongoose.model('Period', periodSchema)