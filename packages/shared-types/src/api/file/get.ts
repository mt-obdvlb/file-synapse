import { FileType } from '@/common'

export type FileGetItem = {
  file: {
    downloads: number
    name: string
    id: number
    type: FileType
    description?: string
    url: string
    uploadTime: string
  }
  user: {
    id: number
    username: string
  }
}

export type FileGetList = FileGetItem[]
