'use client'

import { FileGetItem } from '@mtobdvlb/shared-types'
import Image from 'next/image'

const FilePreviewItem = ({ file }: { file: FileGetItem['file'] }) => {
  if (file.type === 'image') {
    return (
      <Image
        src={file.url}
        alt={file.name}
        width={100}
        height={100}
        className={'size-full object-fill'}
      />
    )
  } else if (file.type === 'video') {
    return (
      <video
        src={file.url}
        autoPlay // 自动播放
        muted // 静音，否则自动播放会被浏览器阻止
        loop // 循环播放
        playsInline // 在移动端内嵌播放
        className='size-full object-cover' // 填充容器
      />
    )
  } else if (file.type === 'audio') {
    return <audio src={file.url} controls className={'size-full object-fill'} />
  } else {
    return (
      <div className={'flex items-center justify-center size-full font-bold'}>
        暂时不支持该文件类型
      </div>
    )
  }
}

export default FilePreviewItem
