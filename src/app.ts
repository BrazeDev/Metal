import bodyparser from 'body-parser'
import express from 'express'
import ewinston from 'express-winston'
import helmet from 'helmet'
import router from './api/router'
import {initialize} from './util/config'
import logger from './util/logger'

const app = express()

app.use(ewinston.logger({
  winstonInstance: logger,
  level: 'debug',
  meta: true,
  msg: "Request :: HTTP {{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms",
  colorize: true
}))

app.set('trust proxy', 1)

app.use(helmet())

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use('/', router)

app.use((q, s, n) => s.status(404).json({status: 404, message: 'The requested route could not be found'}))
app.use((q, s, n) => s.status(500).json({status: 500, message: 'The server was unable to process this request'}))

initialize.then((config) => {
  if (config.resetAdminPass) {
    logger.warn(`'resetAdminPass' is set to true. The admin password will be reset.`)
    // doPasswordSet();
    logger.info(`Admin password has been reset`)
  }
  app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`)
  })
})
