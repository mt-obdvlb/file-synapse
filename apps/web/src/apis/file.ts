import request from '@/libs/request'
import {
  FileDetail,
  FileGetDTO,
  FileGetItem,
  FileUploadDTO,
  PageResult,
  Result,
} from '@mtobdvlb/shared-types'

const baseURL = '/files'

const API = {
  detail: '/',
  list: '/',
  upload: '/',
  delete: '/',
  download: '/download',
} as const

export const fileDetail = (id: string) =>
  request.get<Result<FileDetail>>(`${baseURL}${API.detail}${id}`)

export const fileList = (params: FileGetDTO) =>
  request.get<PageResult<FileGetItem>>(`${baseURL}${API.list}`, {
    params,
  })

export const fileUpload = (
  data: {
    file: File
  } & FileUploadDTO
) => request.post<Result>(`${baseURL}${API.upload}`, data)

export const fileDelete = (id: string) => request.delete<Result>(`${baseURL}${API.delete}${id}`)

export const fileDownload = (id: string) => request.get<Result>(`${baseURL}${API.download}${id}`)
