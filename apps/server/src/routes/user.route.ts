import { Router } from 'express'
import { userGet, userLogin, userLogout, userRegister, userUpdate } from '@/controllers'
import { asyncHandler } from '@/utils'
import { authMiddleware, validatorMiddleware } from '@/middlewares'
import { userLoginDTO, userRegisterDTO, userUpdateDTO } from '@mtobdvlb/shared-types'

const router = Router()

router.post(
  '/register',
  authMiddleware,
  validatorMiddleware({ body: userRegisterDTO }),
  asyncHandler(userRegister)
)
router.get('/', authMiddleware, asyncHandler(userGet))
router.put(
  '/',
  authMiddleware,
  validatorMiddleware({ body: userUpdateDTO }),
  asyncHandler(userUpdate)
)
router.post('/login', validatorMiddleware({ body: userLoginDTO }), asyncHandler(userLogin))
router.post('/logout', authMiddleware, asyncHandler(userLogout))

export default router
