import { Logger } from 'tslog'

const log: Logger = new Logger()

if (process.env.NODE_ENV === 'test') {
  log.setSettings({
    minLevel: 'fatal'
  })
}

export const logMain: Logger = log.getChildLogger({ name: 'main' })

export const logApi: Logger = log.getChildLogger({ name: 'API' })

export const logMetrics: Logger = log.getChildLogger({ name: 'metrics' })

export const logSwagger: Logger = log.getChildLogger({ name: 'swagger' })
