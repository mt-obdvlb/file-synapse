// src/server.ts
import { appConfig } from '@/config'

import app from './app'
import { prisma } from '@/prisma'
import { hashPassword } from '@/utils'

const PORT = appConfig.port

prisma.user.count().then(async (count) => {
  if (count === 0) {
    const password = await hashPassword('12345678')
    await prisma.user.create({
      data: {
        username: 'admin',
        password,
        role: 1,
      },
    })
  }
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}
