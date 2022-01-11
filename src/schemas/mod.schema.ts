import { boolean, object, string, TypeOf } from 'zod'

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