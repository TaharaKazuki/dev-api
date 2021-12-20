import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

// route file
import bootcamps from './routes/bootcamps'

dotenv.config({ path: '../config/config.env' })

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.info(`Server runnig is ${process.env.NODE_ENV} mode on port ${PORT}`)
})
