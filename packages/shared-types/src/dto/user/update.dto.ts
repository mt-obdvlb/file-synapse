import { z } from 'zod/v4'

export const userUpdateDTO = z
  .object({
    username: z
      .string({ message: '用户名不能为空' })
      .min(2, { message: '用户名长度不能少于2位' })
      .max(20, { message: '用户名长度不能超过20位' })
      .optional(),
    password: z
      .string({ message: '密码不能为空' })
      .min(8, { message: '密码长度不能少于8位' })
      .max(20, { message: '密码长度不能超过20位' })
      .optional(),
    confirmedPassword: z
      .string({ message: '确认密码不能为空' })
      .min(8, { message: '确认密码长度不能少于8位' })
      .max(20, { message: '确认密码长度不能超过20位' })
      .optional(),
  })
  .refine((data) => !data.password || data.password === data.confirmedPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmedPassword'],
  })

export type UserUpdateDTO = z.infer<typeof userUpdateDTO>
