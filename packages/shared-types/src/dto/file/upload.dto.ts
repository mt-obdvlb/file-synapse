import { z } from 'zod/v4'

export const fileUploadDTO = z.object({
  name: z
    .string({ message: '文件名不能为空' })
    .trim()
    .min(1, { message: '文件名不能为空' })
    .max(50, { message: '文件名长度不能超过50字符' }),
  description: z
    .string({ message: '描述必须是字符串' })
    .trim()
    .max(200, { message: '描述长度不能超过200字符' })
    .optional(),
})

export type FileUploadDTO = z.infer<typeof fileUploadDTO>
