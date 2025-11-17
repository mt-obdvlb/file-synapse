'use client'

import { FC } from 'react'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { FileGetItem, FileGetList, FileType } from '@mtobdvlb/shared-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFileById, useUserGet } from '@/features'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  buttonVariants,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components'
import { cn } from '@/libs'
import { toast } from 'sonner'
import FilePreviewItem from '@/features/file/components/FilePreviewItem'
import { EyeIcon } from 'lucide-react'

interface FileTableProps {
  fileList: FileGetList
}

const fileTypeMap: Record<FileType, string> = {
  image: '图片',
  video: '视频',
  audio: '音频',
  document: '文档',
  other: '其他',
}

const FileTable: FC<FileTableProps> = ({ fileList }) => {
  const { fileDownload, fileDelete } = useFileById()
  const { user } = useUserGet()
  const columns = [
    {
      header: '文件名',
      accessorFn: (row) => row.file.name,
      cell: (info) => info.getValue(),
    },
    {
      header: '类型',
      accessorFn: (row) => row.file.type,
      cell: (info) => fileTypeMap[info.getValue() as FileType],
    },
    {
      header: '下载量',
      accessorFn: (row) => row.file.downloads,
      cell: (info) => info.getValue(),
    },
    {
      header: '上传者',
      accessorFn: (row) => row.user.username,
      cell: (info) => info.getValue(),
    },
    {
      header: '上传时间',
      accessorFn: (row) => row.file.uploadTime,
      cell: (info) => new Date(info.getValue() as string).toLocaleString(),
    },
    {
      header: '操作',
      accessorFn: (row) => row,
      cell: (info) => {
        const file = info.getValue() as FileGetItem
        return (
          <div className='flex gap-2'>
            <HoverCard openDelay={10} closeDelay={50}>
              <HoverCardTrigger asChild>
                <Button variant='ghost' size='sm' className={'cursor-pointer'}>
                  <EyeIcon className={'size-full'} />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                side={'top'}
                className={'aspect-video h-50 z-999 p-0 overflow-hidden rounded-md'}
              >
                <FilePreviewItem file={file.file} />
              </HoverCardContent>
            </HoverCard>
            <Link
              href={file.file.url}
              target='_blank'
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
              onClick={async () => {
                await fileDownload(file.file.id.toString())
              }}
            >
              下载
            </Link>
            {(user?.isAdmin || user?.id === file.user.id.toString()) && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive' size='sm'>
                    删除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>删除文件</AlertDialogTitle>
                    <AlertDialogDescription>确定要删除此文件吗？</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        const { code } = await fileDelete(file.file.id.toString())
                        if (code) return
                        toast.success('已删除')
                      }}
                    >
                      确定
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )
      },
    },
  ] satisfies ColumnDef<FileGetItem>[]

  const table = useReactTable({
    data: fileList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className={'my-25'}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default FileTable
