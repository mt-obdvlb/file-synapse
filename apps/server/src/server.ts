// src/server.ts
import { appConfig } from '@/config'

import app from './app'

const PORT = appConfig.port

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}
