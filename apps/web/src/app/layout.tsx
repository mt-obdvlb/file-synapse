import { ReactNode } from 'react'
import '@/styles/global.css'

import Head from 'next/head'
import Provider from '@/components/provider/Provider'
import Initializer from '@/components/initializer/Initializer'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html suppressHydrationWarning lang={'zh'}>
      <Head>
        <title>文件管理系统</title>
        <meta name='description' content='文件管理系统' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Provider>
          <main className={'h-screen'}>{children}</main>
          <Initializer />
        </Provider>
      </body>
    </html>
  )
}

export default Layout
