import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'
import morgan from 'morgan'

import actorRouter from './routes/actorRoutes'
import artistRouter from './routes/artistRoutes'
import groupRouter from './routes/groupRoutes'

const app = express()

app.use(morgan('short'))
app.use(json())

app.use('/api/v2/actors', actorRouter)
app.use('/api/v2/artists', artistRouter)
app.use('/api/v2/groups', groupRouter)

app.get('/api/v2/hello', (req: Request, res: Response) => res.send('안녕!'))

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: err.message })
})

export default app
