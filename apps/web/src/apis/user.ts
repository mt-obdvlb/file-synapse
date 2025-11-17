import request from '@/libs/request'
import {
  Result,
  UserGet,
  UserLoginDTO,
  UserRegisterDTO,
  UserUpdateDTO,
} from '@mtobdvlb/shared-types'

const baseURL = '/users'

const API = {
  register: '/register',
  login: '/login',
  update: '/',
  get: '/',
  logout: '/logout',
} as const

export const userRegister = (data: UserRegisterDTO) =>
  request.post<Result>(`${baseURL}${API.register}`, data)

export const userLogin = (data: UserLoginDTO) =>
  request.post<Result>(`${baseURL}${API.login}`, data)

export const userUpdate = (data: UserUpdateDTO) =>
  request.put<Result>(`${baseURL}${API.update}`, data)

export const userGet = () => request.get<Result<UserGet>>(`${baseURL}${API.get}`)

export const userLogout = () => request.post<Result>(`${baseURL}${API.logout}`)
