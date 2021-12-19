import express from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: '../config/config.env' })

const app = express()

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.info(`Server runnig is ${process.env.NODE_ENV} mode on port ${PORT}`)
})
