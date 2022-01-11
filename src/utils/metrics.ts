import express, { Request, Response } from 'express'
import client from 'prom-client'
import { logMetrics as log } from './log'

const app = express()

export const restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: 'REST API response time in seconds',
    labelNames: [ 'method', 'route', 'status_code' ]
})

export const databaseResponseTimeHistogram = new client.Histogram({
    name: 'db_response_time_duration_seconds',
    help: 'DB response time in seconds',
    labelNames: [ 'operation', 'success' ]
})

export const startMetricsServer = (port: number) => {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics();
    app.get("/metrics", async (q, s) => {
        s.set("Content-Type", client.register.contentType)
        return s.send(await client.register.metrics())
    })
    app.listen(port, () => {
        log.info(`Metrics server is listening on http://0.0.0.0:${port}`)
    })
}

export const doResponseTime = (q: Request, s: Response, time: number) => {
    if (q?.route?.path) {
        restResponseTimeHistogram.observe(
            {
                method: q.method,
                route: q.route.path,
                status_code: s.statusCode
            },
            time * 1000
        )
    }
}