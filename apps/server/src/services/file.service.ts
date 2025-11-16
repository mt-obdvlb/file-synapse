import {
  FileDetail,
  FileGetDTO,
  FileGetList,
  FileType,
  FileUploadDTO,
} from '@mtobdvlb/shared-types'
import { HttpError, uploadFile } from '@/utils'
import { prisma } from '@/prisma'
import { LogService } from '@/services/log.service'

const mapMimeToFileType = (mime: string): FileType => {
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime.startsWith('audio/')) return 'audio'
  if (
    mime === 'application/pdf' ||
    mime === 'application/msword' ||
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mime === 'application/vnd.ms-excel' ||
    mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
    return 'document'

  return 'other'
}

export const FileService = {
  // =============================
  // 上传文件
  // =============================
  upload: async (
    userId: string,
    { name, description }: FileUploadDTO,
    file: Express.Multer.File
  ) => {
    const { url } = await uploadFile(file)

    if (!url) throw new HttpError(500, '上传失败')

    const type: FileType = mapMimeToFileType(file.mimetype)

    const savedFile = await prisma.file.create({
      data: {
        name,
        description,
        type, // 保证是 FileType
        size: file.size,
        path: url,
        uploaderId: Number(userId),
      },
    })

    // 记录操作日志
    await LogService.log({
      userId,
      fileId: savedFile.id.toString(),
      operation: 'UPLOAD',
    })
  },

  // =============================
  // 文件列表（分页 + 搜索）
  // =============================
  list: async ({
    kw = '',
    type,
    pageSize = 20,
    page = 1,
  }: FileGetDTO): Promise<{ total: number; list: FileGetList }> => {
    const where: { name?: { contains: string }; type?: FileType } = {}

    if (kw) where.name = { contains: kw }
    if (type) where.type = type

    const total = await prisma.file.count({ where })

    const files = await prisma.file.findMany({
      where,
      include: { uploader: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { uploadTime: 'desc' },
    })

    // 获取当前页所有文件的下载次数
    const fileIds = files.map((f) => f.id)
    const downloads = await prisma.operationLog.groupBy({
      by: ['fileId'],
      where: {
        fileId: { in: fileIds },
        operation: 'DOWNLOAD',
      },
      _count: { fileId: true },
    })

    const downloadsMap = downloads.reduce(
      (acc, cur) => {
        if (cur.fileId) acc[cur.fileId] = cur._count.fileId
        return acc
      },
      {} as Record<number, number>
    )

    const list: FileGetList = files.map((f) => ({
      file: {
        id: f.id,
        name: f.name,
        type: f.type as FileType,
        description: f.description || undefined,
        url: f.path,
        uploadTime: f.uploadTime.toISOString(),
        downloads: downloadsMap[f.id] || 0,
      },
      user: {
        id: f.uploader.id,
        username: f.uploader.username,
      },
    }))

    return { total, list }
  },

  // =============================
  // 文件详情
  // =============================
  detail: async (id: string): Promise<FileDetail> => {
    const f = await prisma.file.findUnique({
      where: { id: Number(id) },
      include: { uploader: true },
    })

    if (!f) throw new HttpError(404, '文件不存在')

    return {
      file: {
        id: f.id,
        name: f.name,
        type: f.type as FileType,
        description: f.description || undefined,
        url: f.path,
        uploadTime: f.uploadTime.toISOString(),
        downloads: 0,
      },
      user: {
        id: f.uploader.id,
        username: f.uploader.username,
      },
    }
  },

  // =============================
  // 删除文件（用户或管理员）
  // =============================
  delete: async (userId: string, isAdmin?: boolean, fileId?: string) => {
    if (!fileId) throw new HttpError(400, '文件ID必填')

    const file = await prisma.file.findUnique({ where: { id: Number(fileId) } })
    if (!file) throw new HttpError(404, '文件不存在')

    if (file.uploaderId !== Number(userId) && !isAdmin) {
      throw new HttpError(403, '无权限删除')
    }

    await prisma.file.delete({ where: { id: file.id } })

    await LogService.log({
      userId: userId,
      fileId: file.id.toString(),
      operation: 'DELETE',
    })

    return { message: '删除成功' }
  },
}
