import { Request, Response } from 'express'
import { CreateModInput, UpdateModInput, DeleteModInput, GetModInput, CreateModVersionInput, UpdateModVersionInput, DeleteModVersionInput, GetModVersionInput } from '../schemas/mod.schema'
import { createMod, deleteMod, findAndUpdateMod, findMod, createModVersion, deleteModVersion, findAndUpdateModVersion, findModVersion } from '../services/mod.service'
//import { logMain as log } from '../utils/log'

export const createModHandler = async (q: Request<CreateModInput['params']>, s: Response) => {
  const params = q.params
  const body = q.body
  const mod = await createMod({ ...params, ...body })
  s.send(mod)
}

export const updateModHandler = async (q: Request<UpdateModInput['params']>, s: Response) => {
  const slug = q.params.slug
  const update = q.body
  const mod = await findMod({ slug })
  if (mod == null) return s.sendStatus(404)
  const updatedMod = await findAndUpdateMod({ slug }, update, {
    new: true
  })
  return s.send(updatedMod)
}

export const getModHandler = async (q: Request<GetModInput['params']>, s: Response) => {
  const slug = q.params.slug
  const mod = await findMod({ slug })
  if (mod == null) return s.sendStatus(404)
  return s.send(mod)
}

export const deleteModHandler = async (q: Request<DeleteModInput['params']>, s: Response) => {
  const slug = q.params.slug
  const mod = await findMod({ slug })
  if (mod == null) return s.sendStatus(404)
  await deleteMod({ slug })
  return s.sendStatus(200)
}

export const createModVersionHandler = async (q: Request<CreateModVersionInput['params']>, s: Response) => {
  const params = q.params
  const body = q.body
  const modversion = await createModVersion({ ...params, ...body })
  s.send(modversion)
}

export const updateModVersionHandler = async (q: Request<UpdateModVersionInput['params']>, s: Response) => {
  const slug = q.params.slug
  const version = q.params.version
  const update = q.body
  const modversion = await findModVersion({ slug, version })
  if (modversion == null) return s.sendStatus(404)
  const updatedModVersion = await findAndUpdateModVersion({ slug, version }, update, {
    new: true
  })
  return s.send(updatedModVersion)
}

export const getModVersionHandler = async (q: Request<GetModVersionInput['params']>, s: Response) => {
  const slug = q.params.slug
  const version = q.params.version
  const modversion = await findModVersion({ slug, version })
  if (modversion == null) return s.sendStatus(404)
  return s.send(modversion)
}

export const deleteModVersionHandler = async (q: Request<DeleteModVersionInput['params']>, s: Response) => {
  const slug = q.params.slug
  const version = q.params.version
  const modversion = await findModVersion({ slug, version })
  if (modversion == null) return s.sendStatus(404)
  await deleteModVersion({ slug, version })
  return s.sendStatus(200)
}
