import { Request, Response, NextFunction } from 'express'

export const getBootcamps = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' })
}

export const getBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id}`,
  })
}

export const createBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamp' })
}

export const updateBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` })
}

export const deleteBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` })
}
