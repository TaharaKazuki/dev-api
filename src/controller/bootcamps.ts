import { Request, Response, NextFunction } from 'express'
import Bootcamp from '../models/Bootcamp'

export const getBootcamps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamps = await Bootcamp.find()
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

export const getBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamps = await Bootcamp.findById(req.params.id)
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps })

    if (!bootcamps) {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    next(error)
  }
}

export const createBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
      success: true,
      data: bootcamp,
    })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

export const updateBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ success: true, data: bootcamp })
    if (!bootcamp) {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

export const deleteBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamps = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamps) {
      return res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
