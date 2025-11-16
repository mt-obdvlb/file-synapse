import 'dotenv/config'

import cookieParser from 'cookie-parser'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import router from '@/routes'
import { errorMiddleware } from '@/middlewares'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1', router)
app.use(errorMiddleware)

export default app
