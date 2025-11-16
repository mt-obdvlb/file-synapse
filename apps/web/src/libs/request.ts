import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { isServer } from '@/utils'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

const request: AxiosInstance = (() => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
    timeout: 15000,
  })

  // —— request interceptor
  instance.interceptors.request.use(async (config) => {
    return config
  })

  // —— response interceptor
  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      console.log(res.data)
      return res.data
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (!isServer()) {
          toast('请重新登录')
        }
        redirect('/login')
      }

      // 其他错误
      if (error.response) {
        if (!isServer()) {
          toast((error.response.data as { message: string })?.message)
        }
        return error.response.data
      }
      return {
        code: 1,
        message: error.message,
      }
    }
  )

  return instance
})()

export default request
