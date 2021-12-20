import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import logger from './middleware/logger'

// logeer
import morgan from 'morgan'
// route file
import bootcamps from './routes/bootcamps'

dotenv.config({ path: path.resolve(__dirname, '../config/config.env') })

const app = express()

console.info('process.env', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(logger)

app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.info(`Server runnig is ${process.env.NODE_ENV} mode on port ${PORT}`)
})
