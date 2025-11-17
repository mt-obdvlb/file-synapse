'use client'

import { useAutoTrigger } from '@/hooks/useAutoTrigger'
import { useRouter } from 'next/navigation'

const NeedAdmin = () => {
  const router = useRouter()

  const { remaining } = useAutoTrigger(() => router.back())

  return (
    <div className={'size-full flex items-center justify-center'}>
      <div className={'text-center'}>
        <h1 className={'text-2xl font-bold'}>需要管理员权限</h1>
        <p className={'text-sm'}>{`${remaining.toFixed(0)}秒后自动返回首页`}</p>
      </div>
    </div>
  )
}

export default NeedAdmin
