import { Router } from 'express'
import { asyncHandler } from '@/utils'
import { fileDelete, fileDetail, fileDownload, fileList, fileUpload } from '@/controllers'
import { authMiddleware, validatorMiddleware } from '@/middlewares'
import { fileGetDTO, fileUploadDTO, idDTO } from '@mtobdvlb/shared-types'
import multer from 'multer'

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }) // 限制 10MB

const router = Router()

router.get('/:id', authMiddleware, validatorMiddleware({ params: idDTO }), asyncHandler(fileDetail))
router.get('/', authMiddleware, validatorMiddleware({ query: fileGetDTO }), asyncHandler(fileList))
router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  validatorMiddleware({ body: fileUploadDTO }),
  asyncHandler(fileUpload)
)
router.delete('/', authMiddleware, validatorMiddleware({ params: idDTO }), asyncHandler(fileDelete))
router.post(
  '/download/:id',
  authMiddleware,
  validatorMiddleware({ params: idDTO }),
  asyncHandler(fileDownload)
)

export default router
