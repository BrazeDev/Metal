import { object, string } from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSession:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */
export const createSessionSchema = object({
  body: object({
    username: string({
      required_error: '`username` is required'
    }),
    password: string({
      required_error: '`password` is required'
    })
  })
})
