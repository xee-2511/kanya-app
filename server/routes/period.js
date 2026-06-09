const express = require('express')
const router = express.Router()
const Period = require('../models/Period')
const jwt = require('jsonwebtoken')

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Log a new period
router.post('/log', auth, async (req, res) => {
  try {
    const { startDate, cycleLength, periodDuration } = req.body
    const period = await Period.create({
      userId: req.userId,
      startDate,
      cycleLength,
      periodDuration
    })
    res.status(201).json(period)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Get all periods for user — sorted newest first
router.get('/all', auth, async (req, res) => {
  try {
    const periods = await Period.find({ userId: req.userId }).sort({ startDate: -1 })
    res.status(200).json(periods)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Get latest period
router.get('/latest', auth, async (req, res) => {
  try {
    const period = await Period.findOne({ userId: req.userId }).sort({ startDate: -1 })
    if (!period) return res.status(404).json({ message: 'No period data found' })
    res.status(200).json(period)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Delete a period log
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    await Period.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router