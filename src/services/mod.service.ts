import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import { get } from 'lodash'
import config from 'config'
import { databaseResponseTimeHistogram } from '../utils/metrics'
import { ModModel, ModVersionModel, ModDocument, ModVersionDocument, CreateModInput, CreateModVersionInput } from '../models/mod.model'
import { query } from 'express'

export const createMod = async (input: CreateModInput) => {
    const metricsLabels = { operation: 'createMod' }
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const mod = await ModModel.create(input)
        timer({ ...metricsLabels, success: 'true' })
        return mod
    } catch (e: any) {
        timer({ ...metricsLabels, success: 'false' })
        throw new Error(e)
    }
}

export const findMod = async (query: FilterQuery<ModDocument>, options: QueryOptions = { lean: true }) => {
    const metricsLabels = { operation: 'findMod' }
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const mod = await ModModel.findOne(query, {}, options)
        timer({ ...metricsLabels, success: 'true' })
        return mod
    } catch (e: any) {
        timer({ ...metricsLabels, success: 'false' })
        throw new Error(e)
    }
}

export const findAndUpdateMod = async (
    query: FilterQuery<ModDocument>,
    update: UpdateQuery<ModDocument>,
    options: QueryOptions
) => {
    return ModModel.findOneAndUpdate(query, update, options)
}

export const deleteMod = async (query: FilterQuery<ModDocument>) => {
    return ModModel.deleteOne(query)
}

export const createModVersion = async (input: CreateModVersionInput) => {
    const metricsLabels = { operation: 'createModVersion' }
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const modversion = await ModVersionModel.create(input)
        timer({ ...metricsLabels, success: 'true' })
        return modversion
    } catch (e: any) {
        timer({ ...metricsLabels, success: 'false' })
        throw new Error(e)
    }
}

export const findModVersion = async (query: FilterQuery<ModVersionDocument>, options: QueryOptions = { lean: true }) => {
    const metricsLabels = { operation: 'findModVersion' }
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const modversion = await ModVersionModel.findOne(query, {}, options)
        timer({ ...metricsLabels, success: 'true' })
        return modversion
    } catch (e: any) {
        timer({ ...metricsLabels, success: 'false' })
        throw new Error(e)
    }
}

export const findAndUpdateModVersion = async (
    query: FilterQuery<ModVersionDocument>,
    update: UpdateQuery<ModVersionDocument>,
    options: QueryOptions
) => {
    return ModVersionModel.findOneAndUpdate(query, update, options)
}

export const deleteModVersion = async (query: FilterQuery<ModVersionDocument>) => {
    return ModVersionModel.deleteOne(query)
}