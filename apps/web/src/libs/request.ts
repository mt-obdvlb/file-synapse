import axios, { type AxiosError, AxiosHeaders, type AxiosInstance, type AxiosResponse } from 'axios'
import { isServer } from '@/utils'
import { toast } from 'sonner'

const request: AxiosInstance = (() => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
    timeout: 15000,
  })

  // —— request interceptor
  instance.interceptors.request.use(async (config) => {
    const headers = new AxiosHeaders(config.headers)

    if (isServer()) {
      // SSR 下才手动注入 Cookie
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      const accessToken = cookieStore.get('access_token')?.value

      const cookieHeader = [accessToken ? `access_token=${accessToken}` : '']
        .filter(Boolean)
        .join('; ')

      if (cookieHeader) {
        headers.set('Cookie', cookieHeader)
      }
    }

    config.headers = headers
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
          window.location.href = '/login'
        }
        return {
          code: 1,
          message: '请重新登录',
        }
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
