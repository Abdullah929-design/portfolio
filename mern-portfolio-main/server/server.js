const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Health ping endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Server is awake and running'
  });
});

// Function to ping own server to keep it awake
const keepServerAwake = () => {
  const healthUrl = `http://localhost:${PORT}/health`;
  
  // Using http module to avoid circular dependency
  const http = require('http');
  
  const req = http.request(healthUrl, (res) => {
    console.log(`Health ping sent at ${new Date().toISOString()}, status: ${res.statusCode}`);
  });
  
  req.on('error', (err) => {
    console.error('Health ping error:', err.message);
  });
  
  req.end();
};

// Schedule health ping every 10 minutes
setInterval(keepServerAwake, 10 * 60 * 1000);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Health ping scheduled every 10 minutes');
  
  // Send initial health ping after server starts
  setTimeout(keepServerAwake, 5000);
});