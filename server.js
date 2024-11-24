


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { authenticate, authorizeRole } = require('./middleware/authMiddleware'); 

const cors = require('cors');

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const sellerRoutes = require('./routes/seller');
const customerRoutes = require('./routes/customer');

// Middleware
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/seller', sellerRoutes);
app.use('/customer', customerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
