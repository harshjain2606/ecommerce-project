const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Add Product
router.post('/add-product', async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = new Product({ ...req.body });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Seller Products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
