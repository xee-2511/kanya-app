const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test route — remove later
app.get('/', (req, res) => {
  res.send('Kanya API is running')
})
// Routes
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)
// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch(err => console.log('DB connection error:', err))
  