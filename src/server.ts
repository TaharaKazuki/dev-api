import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import logger from './middleware/logger'
import morgan from 'morgan'
import connectDB from '../config/db'

dotenv.config({ path: path.resolve(__dirname, '../config/config.env') })

// connect to database
connectDB()

// route file
import bootcamps from './routes/bootcamps'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(logger)

app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
  console.info(`Server runnig is ${process.env.NODE_ENV} mode on port ${PORT}`)
})

process.on('unhandledRejection', (err: Error, promise) => {
  console.info(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})
