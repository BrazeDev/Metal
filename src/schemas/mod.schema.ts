import { boolean, object, string, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateModInput:
 *       type: object
 *       required:
 *         - name
 *         - author
 *         - imageurl
 *         - weburl
 *       properties:
 *         name:
 *           type: string
 *           default: Test Mod
 *         author:
 *           type: string
 *           default: Mr. Test
 *         imageurl:
 *           type: string
 *           default: 'https://placehold.it/300'
 *         weburl:
 *           type: string
 *           default: 'https://braze.dev/'
 *     CreateModResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         slug:
 *           type: string
 *         name:
 *           type: string
 *         author:
 *           type: string
 *         imageurl:
 *           type: string
 *         weburl:
 *           type: string
 *     GetModResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         slug:
 *           type: string
 *         name:
 *           type: string
 *         author:
 *           type: string
 *         imageurl:
 *           type: string
 *         weburl:
 *           type: string
 */

const modpayload = {
  body: object({
    name: string({
      required_error: '`name` is required'
    }),
    author: string({}),
    imageurl: string({}),
    weburl: string({})
  })
}

const modparams = {
  params: object({
    slug: string({
      required_error: '`slug` is required'
    })
  })
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateModVersionInput:
 *       type: object
 *       required:
 *         - filename
 *         - md5
 *         - enabled
 *       properties:
 *         filename:
 *           type: string
 *           default: '/mods/TESTmod/testmod-2.3.4.zip'
 *         md5:
 *           type: string
 *           default: 'aff97160474a056e838c1f721af01edf'
 *         enabled:
 *           type: boolean
 *           default: true
 *     CreateModVersionResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         slug:
 *           type: string
 *         version:
 *           type: string
 *         filename:
 *           type: string
 *         md5:
 *           type: string
 *         enabled:
 *           type: boolean
 *     GetModVersionResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         slug:
 *           type: string
 *         version:
 *           type: string
 *         filename:
 *           type: string
 *         md5:
 *           type: string
 *         enabled:
 *           type: boolean
 */
const modversionpayload = {
  body: object({
    filename: string({
      required_error: '`filename` is required'
    }),
    md5: string({}),
    enabled: boolean({})
  })
}

const modversionparams = {
  params: object({
    slug: string({
      required_error: '`slug` is required'
    }),
    version: string({
      required_error: '`vers` is required'
    })
  })
}

export const createModSchema = object({ ...modpayload, ...modparams })
export const updateModSchema = object({ ...modpayload, ...modparams })
export const deleteModSchema = object({ ...modparams })
export const getModSchema = object({ ...modparams })

export const createModVersionSchema = Object({ ...modversionpayload, ...modversionparams })
export const updateModVersionSchema = Object({ ...modversionpayload, ...modversionparams })
export const deleteModVersionSchema = Object({ ...modversionparams })
export const getModVersionSchema = Object({ ...modversionparams })

export type CreateModInput = TypeOf<typeof createModSchema>
export type UpdateModInput = TypeOf<typeof updateModSchema>
export type DeleteModInput = TypeOf<typeof deleteModSchema>
export type GetModInput = TypeOf<typeof getModSchema>

export type CreateModVersionInput = TypeOf<typeof createModVersionSchema>
export type UpdateModVersionInput = TypeOf<typeof updateModVersionSchema>
export type DeleteModVersionInput = TypeOf<typeof deleteModVersionSchema>
export type GetModVersionInput = TypeOf<typeof getModVersionSchema>
