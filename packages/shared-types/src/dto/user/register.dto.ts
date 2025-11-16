import { z } from 'zod/v4'

export const userRegisterDTO = z
  .object({
    username: z
      .string({ message: '用户名不能为空' })
      .min(1, { message: '用户名长度不能少于1位' })
      .max(20, { message: '用户名长度不能超过20位' }),
    password: z
      .string({ message: '密码不能为空' })
      .min(8, { message: '密码长度不能少于8位' })
      .max(20, { message: '密码长度不能超过20位' }),
    confirmedPassword: z
      .string({ message: '确认密码不能为空' })
      .min(8, { message: '确认密码长度不能少于8位' })
      .max(20, { message: '确认密码长度不能超过20位' }),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmedPassword'],
  })

export type UserRegisterDTO = z.infer<typeof userRegisterDTO>
