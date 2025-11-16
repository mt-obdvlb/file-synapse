import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  FileDetail,
  FileGetDTO,
  FileGetItem,
  FileUploadDTO,
  PageResult,
  Result,
} from '@mtobdvlb/shared-types'

import { MESSAGE } from '@/constants'
import { FileService, LogService } from '@/services'

// =============================
// 上传文件（需要登录）
// =============================
export const fileUpload: RequestHandler<ParamsDictionary, Result, FileUploadDTO> = async (
  req,
  res
) => {
  const userId = req.user?.id
  const file = req.file
  console.log(file, userId)
  if (!userId) {
    return res.status(401).json({
      code: 1,
      message: MESSAGE.AUTH_ERROR,
    })
  }
  if (!file) {
    return res.status(400).json({
      code: 1,
      message: MESSAGE.INVALID_PARAMS,
    })
  }

  await FileService.upload(userId, { ...req.body }, file)

  return res.status(200).json({
    code: 0,
  })
}

// =============================
// 获取文件列表（分页、搜索）
// =============================
export const fileList: RequestHandler<
  ParamsDictionary,
  PageResult<FileGetItem>,
  FileGetDTO
> = async (req, res) => {
  const data = await FileService.list(req.body)

  return res.status(200).json({
    code: 0,
    data,
  })
}

// =============================
// 删除文件（只有文件所属用户或管理员可以删除）
// =============================
export const fileDelete: RequestHandler<ParamsDictionary, Result> = async (req, res) => {
  const userId = req.user?.id
  const isAdmin = req.user?.isAdmin
  const fileId = req.params.id

  if (!userId) {
    return res.status(401).json({
      code: 1,
      message: MESSAGE.AUTH_ERROR,
    })
  }

  if (!fileId) {
    return res.status(400).json({
      code: 1,
      message: MESSAGE.INVALID_PARAMS,
    })
  }

  await FileService.delete(userId, isAdmin, fileId)

  return res.status(200).json({
    code: 0,
  })
}

export const fileDetail: RequestHandler<ParamsDictionary, Result<FileDetail>> = async (
  req,
  res
) => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({
      code: 1,
      message: MESSAGE.INVALID_PARAMS,
    })
  }

  const data = await FileService.detail(id)

  return res.status(200).json({
    code: 0,
    data,
  })
}

export const fileDownload: RequestHandler<ParamsDictionary, Result> = async (req, res) => {
  const userId = req.user?.id
  const fileId = req.params.id
  if (!fileId || !userId) {
    return res.status(400).json({
      code: 1,
      message: MESSAGE.INVALID_PARAMS,
    })
  }

  await LogService.log({
    operation: 'DOWNLOAD',
    userId,
    fileId,
  })

  return res.status(200).json({
    code: 0,
  })
}
