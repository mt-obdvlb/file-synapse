import { Router } from 'express'

import fileRoute from '@/routes/file.route'
import { authMiddleware } from '@/middlewares'
import userRoute from '@/routes/user.route'
import logRoute from '@/routes/log.route'

const router = Router()

router.use('/files', authMiddleware, fileRoute)
router.use('/users', userRoute)
router.use('/logs', logRoute)

export default router
