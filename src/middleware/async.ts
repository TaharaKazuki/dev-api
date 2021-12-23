import { Request, Response, NextFunction } from 'express'

type func = (req: Request, res: Response, next: NextFunction) => void

const asyncHandler =
  (func: func) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next)

export default asyncHandler
