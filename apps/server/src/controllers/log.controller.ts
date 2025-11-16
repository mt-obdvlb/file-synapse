import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { LogGetDTO, LogGetItem, PageResult } from '@mtobdvlb/shared-types'
import { LogService } from '@/services'

export const logList: RequestHandler<ParamsDictionary, PageResult<LogGetItem>, LogGetDTO> = async (
  req,
  res
) => {
  const data = await LogService.list(req.body)
  return res.status(200).json({
    code: 0,
    data,
  })
}
