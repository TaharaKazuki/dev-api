import express, { Router } from 'express'
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} from '../controller/bootcamps'

const router: Router = express.Router()

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/').get(getBootcamps).post(createBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

export default router
