import { Router } from 'express'
import { logList } from '@/controllers'
import { asyncHandler } from '@/utils'
import { authMiddleware, validatorMiddleware } from '@/middlewares'
import { logGetDTO } from '@mtobdvlb/shared-types'

const router = Router()

router.get(
  '/',
  authMiddleware,
  validatorMiddleware({
    query: logGetDTO,
  }),
  asyncHandler(logList)
)

export default router
