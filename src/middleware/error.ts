import { Request, Response, NextFunction } from 'express'
import ErrorResponse from '../utils/errorResponse'

interface IError extends Error {
  statusCode: number
  code?: number
  value?: string
  errors?: [{ message: string }]
}

const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err }

  error.message = err.message

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`
    error = new ErrorResponse(message, 400)
  }

  // Mongoose Schema validation
  if (err.name === 'ValidationError') {
    const messageArray = Object.values(err.errors!).map((val) => val.message)
    error = new ErrorResponse(messageArray.join(), 400)
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' })
}

export default errorHandler
