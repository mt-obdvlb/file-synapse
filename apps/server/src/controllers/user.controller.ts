import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  Result,
  UserGet,
  UserLoginDTO,
  UserRegisterDTO,
  UserUpdateDTO,
} from '@mtobdvlb/shared-types'

import { MESSAGE } from '@/constants'
import { UserService } from '@/services'

export const userRegister: RequestHandler<ParamsDictionary, Result, UserRegisterDTO> = async (
  req,
  res
) => {
  const isAdmin = req.user?.isAdmin
  const userId = req.user?.id
  if (!isAdmin) {
    return res.status(403).json({
      code: 1,
      message: MESSAGE.NOT_PERMISSION,
    })
  }
  if (!userId) {
    return res.status(401).json({
      code: 1,
      message: MESSAGE.AUTH_ERROR,
    })
  }
  await UserService.register(req.body)
  return res.status(200).json({
    code: 0,
  })
}

export const userGet: RequestHandler<ParamsDictionary, Result<UserGet>> = async (req, res) => {
  const userId = req.user?.id
  if (!userId) {
    return res.status(401).json({
      code: 1,
      message: MESSAGE.AUTH_ERROR,
    })
  }
  const data = await UserService.get(userId)
  return res.status(200).json({
    code: 0,
    data,
  })
}

export const userUpdate: RequestHandler<ParamsDictionary, Result, UserUpdateDTO> = async (
  req,
  res
) => {
  const userId = req.user?.id
  if (!userId) {
    return res.status(401).json({
      code: 1,
      message: MESSAGE.AUTH_ERROR,
    })
  }
  await UserService.update(userId, req.body)
  return res.status(200).json({
    code: 0,
  })
}

export const userLogin: RequestHandler<ParamsDictionary, Result, UserLoginDTO> = async (
  req,
  res
) => {
  const { accessToken } = await UserService.login(req.body)
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'strict',
    secure: true,
  })
  return res.status(200).json({
    code: 0,
  })
}

export const userLogout: RequestHandler = async (req, res) => {
  res.clearCookie('access_token')
  return res.status(200).json({
    code: 0,
  })
}
