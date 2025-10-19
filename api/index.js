// Add this at the very top of api/index.js
require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Present' : 'Missing!');const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes and middleware
const productRoutes = require('../routes/products');
const { errorHandler, notFound } = require('../middlewares/errors');

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.get('/', (req, res) => res.send({ message: 'Products Backend Running 🚀' }));
app.use('/api/products', productRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  dbName: 'productsdb',
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  
  // Only start the server if this file is run directly
  if (require.main === module) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  }
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});

// Error handlers
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;