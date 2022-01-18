import { boolean, object, string, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreatePackInput:
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

const packpayload = {
  body: object({
    name: string({
      required_error: '`name` is required'
    }),
    author: string({}),
    imageurl: string({}),
    weburl: string({})
  })
}

const packparams = {
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
const packversionpayload = {
  body: object({
    filename: string({
      required_error: '`filename` is required'
    }),
    md5: string({}),
    enabled: boolean({})
  })
}

const packversionparams = {
  params: object({
    slug: string({
      required_error: '`slug` is required'
    }),
    version: string({
      required_error: '`vers` is required'
    })
  })
}

export const createPackSchema = object({ ...packpayload, ...packparams })
export const updatePackSchema = object({ ...packpayload, ...packparams })
export const deletePackSchema = object({ ...packparams })
export const getPackSchema = object({ ...packparams })

export const createPackVersionSchema = Object({ ...packversionpayload, ...packversionparams })
export const updatePackVersionSchema = Object({ ...packversionpayload, ...packversionparams })
export const deletePackVersionSchema = Object({ ...packversionparams })
export const getPackVersionSchema = Object({ ...packversionparams })

export type CreatePackInput = TypeOf<typeof createPackSchema>
export type UpdatePackInput = TypeOf<typeof updatePackSchema>
export type DeletePackInput = TypeOf<typeof deletePackSchema>
export type GetPackInput = TypeOf<typeof getPackSchema>

export type CreatePackVersionInput = TypeOf<typeof createPackVersionSchema>
export type UpdatePackVersionInput = TypeOf<typeof updatePackVersionSchema>
export type DeletePackVersionInput = TypeOf<typeof deletePackVersionSchema>
export type GetPackVersionInput = TypeOf<typeof getPackVersionSchema>
