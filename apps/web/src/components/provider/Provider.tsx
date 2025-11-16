import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/provider/theme-provider'
import QueryProvider from '@/components/provider/query-provider'

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </>
  )
}

export default Provider
