import { z } from 'zod/v4'

import { FileType } from '@/common/file'

export const fileGetDTO = z.object({
  kw: z.string({ message: '关键字必须是字符串' }).optional(),
  page: z.coerce
    .number({ message: '页码必须是数字' })
    .min(1, { message: '页码不能小于1' })
    .default(1),
  pageSize: z.coerce
    .number({ message: '每页数量必须是数字' })
    .min(1, { message: '每页数量不能小于1' })
    .max(100, { message: '每页数量不能超过100' })
    .default(10),
  type: z
    .enum(['video', 'audio', 'image', 'document', 'other'] satisfies FileType[], {
      message: '文件类型不合法',
    })
    .optional(),
})

export type FileGetDTO = z.infer<typeof fileGetDTO>
