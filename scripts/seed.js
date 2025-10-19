require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  { name: 'Red Apple', price: 40, category: 'fruits', description: 'Fresh and juicy apples' },
  { name: 'Milk Chocolate', price: 120, category: 'chocolates', description: 'Smooth and creamy' },
  { name: 'Banana (Dozen)', price: 50, category: 'fruits', description: 'Sweet ripe bananas' }
];

mongoose.connect(process.env.MONGODB_URI, { dbName: 'productsdb' })
  .then(async () => {
    console.log('Connected to MongoDB...');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Seeded sample products ✅');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
