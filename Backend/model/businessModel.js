const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const Business = sequelize.define(
  'Business',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brand_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 15], // Ensures valid phone number length
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
    gst_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
)

module.exports = Business
