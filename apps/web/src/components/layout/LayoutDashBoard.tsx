'use client'

import { buttonVariants, Dock, DockIcon } from '@/components'
import {
  FileClockIcon,
  FileIcon,
  HomeIcon,
  UploadCloudIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { cn } from '@/libs'
import WithAdmin from '@/components/hoc/WithAdmin'

const LayoutDashBoard = () => {
  const iconList = [
    { icon: <HomeIcon />, title: '主页', href: '/' },
    { icon: <UserIcon />, title: '个人信息', href: '/profile' },
    { icon: <UploadCloudIcon />, title: '上传文件', href: '/upload' },
    { icon: <FileIcon />, title: '文件管理', href: '/file' },
    { icon: <FileClockIcon />, title: '操作记录', href: '/log' },
  ]

  return (
    <Dock className={'pointer-events-auto'} direction={'middle'}>
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
                <UserPlusIcon />
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
