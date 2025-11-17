'use client'

import { ReactNode } from 'react'
import { useUserStore } from '@/features/user/store'

const WithAdmin = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user)
  if (!user.isAdmin) {
    return null
  }

  return children
}

export default WithAdmin
