import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') })

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI!)
  console.info(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

export default connectDB
