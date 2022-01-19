import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import path from 'path/posix'
import connectDB from '../config/db'
import Bootcamp from './models/Bootcamp'

// load env vars
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') })
colors.setTheme({})

connectDB()

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, `../_data/bootcamps.json`), 'utf-8')
)
// Import into DB
const importData = async () => {
  try {
    const bootcamp = await Bootcamp.create(bootcamps)
    console.info('Data Imported...'.green.inverse)
    process.exit(1)
  } catch (err) {
    console.error(err)
  }
}
// delete DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    console.info('Data Destoryed...'.red.inverse)
    process.exit(1)
  } catch (err) {
    console.info(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
