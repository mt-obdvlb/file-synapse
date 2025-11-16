import { z } from 'zod/v4'

export const idDTO = z.object({
  id: z.string(),
})
