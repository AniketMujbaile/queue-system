const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initialize } = require('./services/queueService');
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize RabbitMQ
initialize();

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
