import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import config from 'config'
import responseTime from 'response-time'
import db from './utils/db'
import { logMain as log } from './utils/log'
import { startMetricsServer, doResponseTime } from './utils/metrics'
import router from './router'
import swaggerDocs from './utils/swagger'
import deserializeUser from './middleware/deserializeUser'
import error from './utils/error'
import requestId from 'express-request-id'

dotenv.config()

const port = config.get<number>('port')
const mport = config.get<number>('metricsPort')

const app = express()

app.use(express.json())
app.use(responseTime((q: Request, s: Response, t: number) => doResponseTime(q, s, t)))
app.use(requestId())
// Attempts to deserialize user from JWT, doesn't bother if there isn't one
app.use(deserializeUser)
app.use('/api', router)

app.listen(port, async () => {
  log.info(`Braze is listening on http://0.0.0.0:${port}`)
  await db.connect()
  startMetricsServer(mport)
  swaggerDocs(app, port)
})

export default app
