import { object, string, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - username
 *         - mailaddr
 *         - password
 *         - passconf
 *       properties:
 *         username:
 *           type: string
 *           default: testuser
 *         mailaddr:
 *           type: string
 *           default: test@braze.dev
 *         password:
 *           type: string
 *           default: NotSecure123!
 *         passconf:
 *           type: string
 *           default: NotSecure123!
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *         mailaddr:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
export const createUserSchema = object({
    body: object({
        username: string({
            required_error: '`username` is required'
        }),
        mailaddr: string({
            required_error: '`mailaddr` is required'
        }).email('Invalid email address'),
        password: string({
            required_error: '`password` is required'
        }).min(8, 'Password must contain at least 8 characters'),
        passconf: string({
            required_error: '`passconf` is required'
        })
    }).refine((data) => data.password === data.passconf, {
        message: 'Passwords do not match',
        path: [ 'passconf' ]
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passconf'>