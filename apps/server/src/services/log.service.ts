import { FileType, LogGetDTO, LogGetList, OperationType } from '@mtobdvlb/shared-types'
import { prisma } from '@/prisma'
import { HttpError } from '@/utils'
import { MESSAGE } from '@/constants'

export const LogService = {
  // =============================
  // 获取操作日志列表
  // =============================
  list: async ({
    pageSize = 20,
    page = 1,
    userId,
    operationType,
  }: LogGetDTO): Promise<{ total: number; list: LogGetList }> => {
    const where: { userId?: number; operation?: OperationType } = {}

    if (userId) where.userId = Number(userId)
    if (operationType) where.operation = operationType

    const total = await prisma.operationLog.count({ where })

    const logs = await prisma.operationLog.findMany({
      where,
      include: {
        user: true,
        file: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { operationTime: 'desc' },
    })

    const list: LogGetList = logs.map((l) => ({
      log: {
        operationType: l.operation as OperationType,
      },
      user: {
        id: l.user.id.toString(),
        name: l.user.username,
      },
      file: l.file
        ? {
            id: l.file.id.toString(),
            name: l.file.name,
            type: l.file.type as FileType,
            size: l.file.size,
            url: l.file.path,
            uploadTime: l.file.uploadTime.toISOString(),
            description: l.file.description || undefined,
          }
        : undefined,
    }))

    return { total, list }
  },

  // =============================
  // 记录操作日志
  // =============================
  log: async ({
    operation,
    userId,
    fileId,
  }: {
    operation: OperationType
    userId: string
    fileId?: string
  }) => {
    if (fileId) {
      const file = await prisma.file.findUnique({
        where: { id: Number(fileId) },
      })
      if (!file) throw new HttpError(400, MESSAGE.FILE_NOT_FOUND)
    }
    await prisma.operationLog.create({
      data: {
        userId: Number(userId),
        fileId: Number(fileId),
        operation,
      },
    })
  },
}
