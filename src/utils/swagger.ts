import { Express, Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { version } from '../../package.json'
import { logSwagger as log } from './log'

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Braze Metal API Docs',
            author: 'BrazeDev',
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'jwt'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        './src/router.ts',
        './src/schemas/*.ts'
    ]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app: Express, port: number) => {
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    app.get('/docsjson', (q: Request, s: Response) => {
        s.setHeader('Content-Type', 'application/json')
        s.send(swaggerSpec)
    })
    log.info(`API docs available at http://0.0.0.0:${port}/docs`)
}

export default swaggerDocs