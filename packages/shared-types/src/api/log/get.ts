import { FileType, OperationType } from '@/common'

export type LogGetItem = {
  log: {
    operationType: OperationType
    operationTime: string
    id: string
  }
  file?: {
    id: string
    name: string
    type: FileType
    size: number
    url: string
    uploadTime: string
    description?: string
  }
  user: {
    id: string
    name: string
  }
}

export type LogGetList = LogGetItem[]
