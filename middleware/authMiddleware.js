const jwt = require('jsonwebtoken');

// Authenticate Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

// Authorize Role Middleware
const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied. Unauthorized role.' });
  }
  next();
};

// Export middlewares correctly
module.exports = { authenticate, authorizeRole };
