import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import path from 'path/posix'
import Bootcamp from './src/models/Bootcamp'

// load env vars
dotenv.config({ path: path.resolve(__dirname, './config/config.env') })
colors.setTheme({})

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI!)
  console.info(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    console.info('Data Imported...'.green.inverse)
  } catch (err) {
    console.error(err)
  }
}

// delete DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    console.info('Data Destoryed...'.red.inverse)
  } catch (err) {
    console.info(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
