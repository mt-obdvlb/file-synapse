import { ReactNode } from 'react'
import LayoutHeaderWrapper from '@/components/layout/LayoutHeaderWrapper'
import LayoutDashBoard from '@/components/layout/LayoutDashBoard'

const WithAuth = async ({ children }: { children: ReactNode }) => {
  return (
    <div className={'h-full bg-background pt-20'}>
      <header
        className={
          'h-20  fixed top-0 w-full z-9999  shadow-md  dark:shadow-amber-50 dark:shadow-sm'
        }
      >
        <LayoutHeaderWrapper />
      </header>
      <main className={'h-[calc(100%-100px)]'}>{children}</main>
      <nav className={'fixed bottom-25 inset-x-0'}>
        <LayoutDashBoard />
      </nav>
    </div>
  )
}

export default WithAuth
