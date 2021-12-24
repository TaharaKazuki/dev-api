import { Request, Response, NextFunction } from 'express'
import ErrorResponse from '../utils/errorResponse'

interface IError extends Error {
  statusCode: number
  code?: number
  value?: string
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

  if (err.code === 11000) {
    const message = `Duplicate field value entered`
    error = new ErrorResponse(message, 400)
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' })
}

export default errorHandler
