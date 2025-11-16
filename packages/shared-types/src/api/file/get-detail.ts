import { FileType } from '@/common'

export type FileDetail = {
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
