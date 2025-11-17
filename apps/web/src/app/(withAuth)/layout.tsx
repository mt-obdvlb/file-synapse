import { ReactNode } from 'react'
import { userGet } from '@/apis'
import { redirect } from 'next/navigation'

const WithAuth = async ({ children }: { children: ReactNode }) => {
  const { data } = await userGet()
  console.log(data)
  if (!data?.id) {
    redirect('/login')
  }

  return children
}

export default WithAuth
