import winston from 'winston'

const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warn: 4,
  notice: 5,
  info: 6,
  debug: 7
}

const colors = {
  emerg: 'yellow redBG',
  alert: 'red yellowBG',
  crit: 'magenta',
  error: 'red',
  warn: 'yellow',
  notice: 'green',
  info: 'blue',
  debug: 'cyan'
}

const level = () => {
  let env = process.env.NODE_ENV || 'development'
  return (env === 'development') ? 'debug' : 'warn'
}

const format = winston.format.combine(
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
  winston.format.colorize({all: true}),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
)

const transports = [
  new winston.transports.Console()
]

winston.addColors(colors)

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
})

export default logger
