const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')

const authenticateBusiness = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.business = decoded // Attach business data to the request object
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = authenticateBusiness
