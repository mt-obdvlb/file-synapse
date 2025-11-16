export interface Result<T = undefined> {
  code: number
  message?: string
  data?: T
}

export type Page<T = undefined> = {
  total: number
  list: T[]
}

export type PageResult<T = undefined> = Result<Page<T>>
