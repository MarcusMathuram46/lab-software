// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../model/userModel"); // Sequelize User model
// const { JWT_SECRET } = require("../config/config");

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user in MySQL using Sequelize
//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         // Check password using bcrypt
//         const passCheck = await bcrypt.compare(password, user.passwordHash);
//         if (!passCheck) {
//             return res.status(400).json({ message: "Invalid password" });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             {
//                 email,
//                 id: user.id, // Use 'id' instead of '_id' for MySQL
//             },
//             JWT_SECRET,
//             { expiresIn: "1h" } // Token expiration (optional)
//         );

//         res.status(200).json({ message: "Signin successful", token, user });
//     } catch (e) {
//         console.error("Error in login: ", e);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = login;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const { JWT_SECRET } = require('../config/config')

if (!JWT_SECRET) {
  console.error('❌ JWT_SECRET is missing!')
  process.exit(1)
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const passCheck = await bcrypt.compare(password, user.passwordHash)
    if (!passCheck) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({ message: 'Signin successful', token, user })
  } catch (error) {
    console.error('Error in login:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = login
