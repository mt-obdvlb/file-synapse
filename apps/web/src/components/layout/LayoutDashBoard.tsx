'use client'

import { buttonVariants, Dock, DockIcon } from '@/components'
import { FileIcon, HomeIcon, UploadCloudIcon, UserIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { cn } from '@/libs'
import WithAdmin from '@/components/hoc/WithAdmin'

const LayoutDashBoard = () => {
  const iconList = [
    { icon: <HomeIcon />, title: '主页', href: '/' },
    { icon: <FileIcon />, title: '文件管理', href: '/file' },
    { icon: <UserIcon />, title: '个人信息', href: '/profile' },
    { icon: <UploadCloudIcon />, title: '上传文件', href: '/upload' },
  ]

  return (
    <Dock direction={'middle'}>
      {iconList.map((item, index) => (
        <DockIcon key={index} size={50} distance={50}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'size-12 rounded-full'
                )}
              >
                {item.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{item.title}</TooltipContent>
          </Tooltip>
        </DockIcon>
      ))}
      <WithAdmin>
        <DockIcon size={50} distance={50}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={'/user'}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'size-12 rounded-full'
                )}
              >
                <UserIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>新增用户</TooltipContent>
          </Tooltip>
        </DockIcon>
      </WithAdmin>
    </Dock>
  )
}

export default LayoutDashBoard
