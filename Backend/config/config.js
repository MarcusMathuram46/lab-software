// require("dotenv").config();

// const PORT = process.env.PORT || 3001;
// const DB_NAME = process.env.DB_NAME;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_HOST = process.env.DB_HOST || "localhost";
// const JWT_SECRET = process.env.JWT_SECRET;

// module.exports = {
//     PORT,
//     DB_NAME,
//     DB_USER,
//     DB_PASSWORD,
//     DB_HOST,
//     JWT_SECRET,
// };
require('dotenv').config()

const requiredEnv = [
  'PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'DB_HOST',
  'JWT_SECRET',
]
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`)
    process.exit(1)
  }
})

const config = {
  PORT: process.env.PORT || 5001,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST || 'localhost',
  JWT_SECRET: process.env.JWT_SECRET,
}

module.exports = config

