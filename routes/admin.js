const express = require('express');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware.js');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

// Middleware: Only Admins can access these routes
router.use(authenticate, authorizeRole(['admin']));

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('customer products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.put('/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Verify customer
router.put('/verify-customer/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
