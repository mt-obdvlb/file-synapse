import { z } from 'zod/v4'

export const userUpdateDTO = z
  .object({
    username: z
      .string({ message: '用户名不能为空' })
      .min(2, { message: '用户名长度不能少于2位' })
      .max(20, { message: '用户名长度不能超过20位' })
      .optional(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, { message: '密码长度不能少于8位' })
      .refine((val) => !val || val.length <= 20, { message: '密码长度不能超过20位' }),
    confirmedPassword: z.string().optional(),
  })
  .superRefine(({ password, confirmedPassword }, ctx) => {
    // 只有 password 有值时才检查一致性
    if (password && password !== confirmedPassword) {
      ctx.addIssue({
        path: ['confirmedPassword'],
        message: '两次输入的密码不一致',
        code: 'custom',
      })
    }
  })

export type UserUpdateDTO = z.infer<typeof userUpdateDTO>
