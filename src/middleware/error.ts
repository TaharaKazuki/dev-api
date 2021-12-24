import { Request, Response, NextFunction } from 'express'

interface IError extends Error {
  statusCode: number
}

const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info(err.stack!.red)

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || 'Server Error' })
}

export default errorHandler

// import ErrorResponse from '../utils/errorResponse'

// interface IError extends ErrorResponse {
//   value?: string
//   code?: number
//   errors?: {
//     message: string
//   }[]
// }

// const errorHandler = (
//   err: IError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let error = { ...err }
//   error.message = error.message

//   if (err.name === 'CastError') {
//     const message = `Bootcamp not found with id of ${err.value}`
//     error = new ErrorResponse(message, 404)
//   }

//   if (err.code === 11000) {
//     const message = 'Duplicate field value entered'
//     error = new ErrorResponse(message, 400)
//   }

//   if (err.name == 'ValidationError') {
//     const message = Object.values(err.errors!).map((value) => value.message)[0]
//     error = new ErrorResponse(message, 400)
//   }

//   res.status(error.statusCode || 500).json({
//     success: false,
//     error: error.message || 'Server Error',
//   })
// }

// export default errorHandler
