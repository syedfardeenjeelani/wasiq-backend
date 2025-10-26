const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// CREATE new product
router.post('/', async (req, res) => {
  const { name, description, price, discountedPrice, category, imageUrl, stock } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Name and price are required' });
  const product = new Product({ name, description, price, discountedPrice, category, imageUrl, stock });
  await product.save();
  res.status(201).json(product);
});

// UPDATE a product
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
