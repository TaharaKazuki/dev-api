import express, { Router } from 'express'

const router: Router = express.Router()

router.route('/').get().post()

router.route('/:id').get().put().delete()

export default router
