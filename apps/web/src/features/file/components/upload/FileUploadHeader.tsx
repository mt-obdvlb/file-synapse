'use client'

import { tv } from 'tailwind-variants'
import { Separator } from '@/components'
import { cn } from '@/libs'
import { ClipboardTypeIcon, FileSlidersIcon } from 'lucide-react'

const FileUploadHeader = () => {
  const { container, icon, text } = tv({
    slots: {
      container: cn('flex flex-col  flex-1 items-center'),
      icon: cn('text-gray-600 size-25 '),
      text: cn('text-gray-500 '),
    },
  })()

  return (
    <div className={'size-full flex gap-10 py-6'}>
      <div className={container()}>
        <FileSlidersIcon className={icon()} />
        <p className={text()}>文件大小要小于10MB以下~</p>
      </div>
      <Separator orientation={'vertical'} className={'h-35! my-auto'} />
      <div className={container()}>
        <ClipboardTypeIcon className={icon()} />
        <p className={text()}>文件格式可以是视频,音频,图片,文档等其他格式~</p>
      </div>
    </div>
  )
}

export default FileUploadHeader
