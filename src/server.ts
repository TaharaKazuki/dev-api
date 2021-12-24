import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import logger from './middleware/logger'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from '../config/db'
import errorHandler from './middleware/error'

dotenv.config({ path: path.resolve(__dirname, '../config/config.env') })
colors.setTheme({})

// connect to database
connectDB()

// route file
import bootcamps from './routes/bootcamps'

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(logger)

app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandler)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
  console.info(
    `Server runnig is ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})

process.on('unhandledRejection', (err: Error, promise) => {
  console.info(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})
