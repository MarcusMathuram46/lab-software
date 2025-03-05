const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Business = require('../model/businessModel')
const { JWT_SECRET } = require('../config/config')

if (!JWT_SECRET) {
  console.error('❌ JWT_SECRET is missing!')
  process.exit(1)
}

// 📌 REGISTER BUSINESS
exports.registerBusiness = async (req, res) => {
  const { brand_name, phone_number, address, email, gst_number, password } =
    req.body

  // ✅ Input Validation
  if (
    !brand_name ||
    !phone_number ||
    !address ||
    !email ||
    !gst_number ||
    !password
  ) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // ✅ Check if business already exists (by email)
    const existingBusiness = await Business.findOne({ where: { email } })
    if (existingBusiness) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    // ✅ Check if GST number is already used
    const existingGST = await Business.findOne({ where: { gst_number } })
    if (existingGST) {
      return res.status(400).json({ error: 'GST Number already registered' })
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ Create Business
    const newBusiness = await Business.create({
      brand_name,
      phone_number,
      address,
      email,
      gst_number,
      password_hash: hashedPassword,
    })

    res
      .status(201)
      .json({
        message: 'Business Registered Successfully',
        business: newBusiness,
      })
  } catch (error) {
    console.error('Error registering business:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// 📌 LOGIN BUSINESS
exports.loginBusiness = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    // ✅ Find business by email
    const business = await Business.findOne({ where: { email } })

    if (!business) {
      return res.status(400).json({ error: 'Invalid Credentials' })
    }

    // ✅ Check Password
    const isMatch = await bcrypt.compare(password, business.password_hash)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' })
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: business.id, email: business.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ message: 'Login successful', token, business })
  } catch (error) {
    console.error('Error logging in business:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
exports.getBusinessDetails = async (req, res) => {
  try {
    const business = await Business.findByPk(req.business.id)

    if (!business) {
      return res.status(404).json({ error: 'Business not found' })
    }

    res.json(business)
  } catch (error) {
    console.error('Error fetching business details:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
