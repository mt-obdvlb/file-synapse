import { z } from 'zod/v4'

import type { OperationType } from '@/common/log'

export const logGetDTO = z.object({
  page: z.coerce
    .number({ message: '页码必须是数字' })
    .min(1, { message: '页码不能小于1' })
    .default(1),
  pageSize: z.coerce
    .number({ message: '每页数量必须是数字' })
    .min(1, { message: '每页数量不能小于1' })
    .max(100, { message: '每页数量不能超过100' })
    .default(10),
  username: z.string().optional(),
  operationType: z
    .enum(['LOGIN', 'DOWNLOAD', 'UPLOAD', 'UPDATE_USER'] satisfies OperationType[], {
      message: '操作类型不合法',
    })
    .optional(),
})

export type LogGetDTO = z.infer<typeof logGetDTO>
