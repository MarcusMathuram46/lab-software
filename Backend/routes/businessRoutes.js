const express = require('express')
const {
  registerBusiness,
  loginBusiness,
  getBusinessDetails,
} = require('../controller/businessController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/register', registerBusiness)
router.post('/login', loginBusiness)
router.get('/details', authMiddleware, getBusinessDetails)
module.exports = router
