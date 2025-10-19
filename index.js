require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const productRoutes = require('./routes/products');
const { errorHandler, notFound } = require('./middlewares/errors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send({ message: 'Products Backend Running 🚀' }));

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI, { dbName: 'productsdb' })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection failed:', err));



  // Add this at the end of your index.js file
module.exports = app;