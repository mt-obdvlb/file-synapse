'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const QueryProvider = ({ ...props }) => {
  const queryClient = new QueryClient()
  return <QueryClientProvider {...props} client={queryClient} />
}

export default QueryProvider
