'use client'

import { LineShadowText } from '@/components/ui/line-shadow-text'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatedThemeToggler, Button } from '@/components'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useUser, useUserGet } from '@/features'

const titleMap = {
  '/': '文件管理系统',
  '/profile': '个人中心',
  '/user': '新增用户',
  '/file': '文件管理',
  '/log': '日志管理',
} as Record<string, string>

const LayoutHeaderWrapper = () => {
  useUserGet()
  const [title, setTitle] = useState('文件管理系统')
  const pathname = usePathname()
  const router = useRouter()
  const { userLogout } = useUser()
  useEffect(() => {
    setTitle(titleMap[pathname] || '文件管理系统')
  }, [pathname])

  return (
    <div className={'h-full flex justify-between items-center px-16 flex-nowrap'}>
      <h1 onClick={() => router.push('/')} className={'cursor-pointer'}>
        <LineShadowText className={'italic w-100 font-bold text-5xl '}>{title}</LineShadowText>
      </h1>
      <div className={'flex items-center gap-30 '}>
        <AnimatedThemeToggler className={'size-10'} />
        <HoverCard closeDelay={50} openDelay={10}>
          <HoverCardTrigger>
            <Avatar onClick={() => router.push('/profile')} className={'size-10 cursor-pointer'}>
              <AvatarImage src='avatar.png' className={'object-center'} />
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className={'w-35'}>
            <div className={'flex flex-col '}>
              <Button
                onClick={() => router.push('/profile')}
                variant={'ghost'}
                className={'text-center cursor-pointer'}
              >
                个人信息
              </Button>
              <Button
                onClick={() => userLogout()}
                variant={'ghost'}
                className={'text-center cursor-pointer'}
              >
                退出登录
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}

export default LayoutHeaderWrapper
