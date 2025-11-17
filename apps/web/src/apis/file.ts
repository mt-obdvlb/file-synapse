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

export const fileUpload = (data: { file: File } & FileUploadDTO) => {
  const formData = new FormData()
  formData.append('file', data.file)

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'file' && value !== undefined) {
      formData.append(key, String(value))
    }
  })

  return request.post<Result>(`${baseURL}${API.upload}`, formData)
}

export const fileDelete = (id: string) => request.delete<Result>(`${baseURL}${API.delete}${id}`)

export const fileDownload = (id: string) => request.post<Result>(`${baseURL}${API.download}/${id}`)
