import { z } from 'zod/v4'

export const userLoginDTO = z.object({
  username: z.string({ message: '用户名不能为空' }).min(1, { message: '用户名不能为空' }),
  password: z.string({ message: '密码不能为空' }).min(8, { message: '密码长度不能少于8位' }),
})

export type UserLoginDTO = z.infer<typeof userLoginDTO>
