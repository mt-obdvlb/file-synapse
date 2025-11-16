import { UserGet, UserLoginDTO, UserRegisterDTO, UserUpdateDTO } from '@mtobdvlb/shared-types'
import { comparePassword, hashPassword, HttpError, signToken } from '@/utils'
import { prisma } from '@/prisma'
import { LogService } from '@/services/log.service'

export const UserService = {
  // ===========================
  // 注册
  // ===========================
  register: async ({ password, confirmedPassword, username }: UserRegisterDTO) => {
    if (password !== confirmedPassword) {
      throw new HttpError(400, '两次密码不一致')
    }

    const exists = await prisma.user.findUnique({ where: { username } })
    if (exists) throw new HttpError(400, '用户名已存在')

    const hashed = await hashPassword(password)

    await prisma.user.create({
      data: {
        username,
        password: hashed,
        role: 2,
      },
    })
  },

  // ===========================
  // 获取当前用户信息
  // ===========================
  get: async (userId: string): Promise<UserGet> => {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, username: true },
    })

    if (!user) throw new HttpError(404, '用户不存在')

    return {
      id: user.id.toString(),
      username: user.username,
    }
  },

  // ===========================
  // 修改用户信息（用户名 + 密码）
  // ===========================
  update: async (userId: string, { confirmedPassword, password, username }: UserUpdateDTO) => {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } })
    if (!user) throw new HttpError(404, '用户不存在')

    const data: { username?: string; password?: string } = {}

    if (username) {
      const exists = await prisma.user.findUnique({ where: { username } })
      if (exists && exists.id !== Number(userId)) {
        throw new HttpError(400, '用户名已存在')
      }
      data.username = username
    }

    if (password) {
      if (password !== confirmedPassword) throw new HttpError(400, '两次密码不一致')
      data.password = await hashPassword(password)
    }

    const res = await prisma.user.update({
      where: { id: Number(userId) },
      data,
    })
    await LogService.log({
      operation: 'UPDATE_USER',
      userId: res.id.toString(),
    })
  },

  // ===========================
  // 登录
  // ===========================
  login: async (body: UserLoginDTO): Promise<{ accessToken: string }> => {
    const { username, password } = body

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) throw new HttpError(400, '用户名或密码错误')

    const ok = await comparePassword(password, user.password)
    if (!ok) throw new HttpError(400, '用户名或密码错误')

    const accessToken = signToken({
      id: user.id.toString(),
      isAdmin: user.role === 1,
    })

    await LogService.log({
      operation: 'LOGIN',
      userId: user.id.toString(),
    })

    return { accessToken }
  },
}
