import { Request, Response, NextFunction } from 'express'
import Bootcamp from '../models/Bootcamp'
import ErrorResponse from '../utils/errorResponse'
import asyncHandler from '../middleware/async'
import geocoder from '../utils/geocoder'

export const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find()
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})

export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

export const createBootcamp = asyncHandler(async (req, res, next) => {
  // console.info('req.body', req.body)
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({
    success: true,
    data: bootcamp,
  })
})

export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.findByIdAndDelete(req.params.id)
  if (!bootcamps) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  }
})

export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params
  console.info('zipcode', zipcode)
  console.info('distance', distance)
  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  console.info('loc', loc)
  // console.info('distance', distance)
  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earch Radius = 3.963mi / 6.378 km
  const radius = +distance / 3963

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})
