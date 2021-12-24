import { Request, Response, NextFunction } from 'express'
import ErrorResponse from '../utils/errorResponse'

interface IError extends Error {
  statusCode: number
  value?: string
}

const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err }
  console.info(err.stack!.red)

  error.message = err.message
  // Mongoose bad ObjectId
  console.info(err.name)

  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' })
}

export default errorHandler
