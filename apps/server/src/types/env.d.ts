// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // 通用
    PORT?: string

    // JWT
    JWT_SECRET: string
    JWT_ACCESS_EXPIRES_IN?: string
    JWT_REFRESH_EXPIRES_IN?: string

    // OSS
    OSS_REGION: string
    OSS_ACCESS_KEY_ID: string
    OSS_ACCESS_KEY_SECRET: string
    OSS_BUCKET: string

    // 数据库
    DATABASE_URL: string
  }
}
