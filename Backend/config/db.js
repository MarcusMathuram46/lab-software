// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: false, // Disable logging (optional)
// });

// sequelize.authenticate()
//     .then(() => console.log("✅ MySQL Database Connected"))
//     .catch(err => console.error("❌ Error connecting to MySQL:", err));

// module.exports = sequelize;
const { Sequelize } = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable SQL logs
  }
)

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ MySQL Database Connected')
  } catch (error) {
    console.error('❌ Error connecting to MySQL:', error)
    process.exit(1) // Stop the server if DB fails
  }
})()

module.exports = sequelize
