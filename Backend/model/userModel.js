// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db"); // Import Sequelize instance

// const User = sequelize.define("User", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     passwordHash: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW, // Default to current timestamp
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
// });

// module.exports = User;
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures no duplicate emails
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
) // Auto-handles createdAt and updatedAt

module.exports = User
