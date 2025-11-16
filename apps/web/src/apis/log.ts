import request from '@/libs/request'
import { LogGetDTO, LogGetItem, PageResult } from '@mtobdvlb/shared-types'

const baseURL = '/logs'

const API = { list: '/' } as const

export const logList = (params: LogGetDTO) =>
  request.get<PageResult<LogGetItem>>(`${baseURL}${API.list}`, {
    params,
  })
