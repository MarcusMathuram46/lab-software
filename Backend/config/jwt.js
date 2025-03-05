const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

if (!JWT_SECRET) {
  console.error('❌ JWT_SECRET is not defined in environment variables.')
  process.exit(1)
}

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' })

module.exports = generateToken
