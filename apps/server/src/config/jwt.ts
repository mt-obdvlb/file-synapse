export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'file_synapse_secret',
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}
