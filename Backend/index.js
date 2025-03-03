const express = require('express')
const { PORT } = require('./config/config')
const sequelize = require('./config/db') // MySQL connection
const userRoute = require('./routes/userRoute')

const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/user', userRoute)



// Sync MySQL Database & Start Server
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Connected to MySQL')

    await sequelize.sync({ alter: true }) // Ensures tables are created/updated
    console.log('✅ Database Synced!')

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`)
    })

  } catch (error) {
    console.error('❌ Error connecting to MySQL:', error)
  }
})()
