import jwt, { JwtPayload } from 'jsonwebtoken'

import { jwtConfig } from '@/config'
import { MESSAGE } from '@/constants'

export const signToken = (payload: { id: string; isAdmin: boolean }): string => {
  const expiresIn = jwtConfig.expiresIn as jwt.SignOptions['expiresIn']
  return jwt.sign(payload, jwtConfig.secret, { expiresIn })
}

export const verifyToken = (token: string) => {
  const payload = jwt.verify(token, jwtConfig.secret)

  if (typeof payload === 'string') {
    throw new Error(MESSAGE.INVALID_TOKEN)
  }

  return payload as JwtPayload & { id: string; isAdmin: boolean }
}
