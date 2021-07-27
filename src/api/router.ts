import express from 'express'
import meta from './controllers/meta.controller'


const router = express.Router()

/**
 * Solder Compatability Endpoints
 */

router.get('/', (q, s, n) => meta.solderVersion(q, s, n))
router.get('/verify', (q, s, n) => { })
router.get('/verify/:key', (q, s, n) => { })

/**
 * Metal Information Endpoints
 */

router.get('/info', (q, s, n) => meta.metalVersion(q, s, n))
router.get('/v1/', (q, s, n) => meta.metalVersion(q, s, n))

/**
 * User Auth Endpoints
 */

router.post('/auth/login', (q, s, n) => { })
router.post('/auth/register', (q, s, n) => { })
router.get('/auth/user', (q, s, n) => { })

/**
 * Token Auth Endpoints
 */

router.get('/keys/:page', (q, s, n) => { })
router.put('/keys/:key', (q, s, n) => { })
router.delete('/keys/:key', (q, s, n) => { })

/**
 * Mod Endpoints
 */

// Lists meta-info about the mods (count, total versions, latest, etc.)
router.get('/mods/', (q, s, n) => { })
// Gets a list of mods & their data on a page-by-page basis
router.get('/mods/list/:page', (q, s, n) => { })
// Gets info about the mod with the supplied slug
router.get('/mods/:slug', (q, s, n) => { })
// Gets info about the mod with the supplied slug
router.get('/mods/:slug/:vers', (q, s, n) => { })
// Creates a mod with the supplied slug
router.post('/mods/:slug/:vers', (q, s, n) => { })
// Deletes the mod with the supplied slug
router.delete('/mods/:slug/:vers', (q, s, n) => { })
// Identifies what has been uploaded and returns information about the uploaded .zip/.jar/etc.
router.post('/mods/id', (q, s, n) => { })

/**
 * Modpack Endpoints
 */

// Does some real-life magic! (takes instance .zip and creates mods/pack from it)
router.post('/packs/imfeelinglucky', (q, s, n) => { })
// Lists meta-info about the packs (count, total versions, latest, etc.)
router.get('/packs/', (q, s, n) => { })
// Gets a list of packs and basic pertinent data on a page-by-page basis
router.get('/packs/list/:page', (q, s, n) => { })
// Gets info about the pack with the supplied slug
router.get('/packs/:slug', (q, s, n) => { })
// Creates a pack with the supplied slug
router.post('/packs/:slug', (q, s, n) => { })
// Deletes the pack with the supplied slug
router.delete('/packs/:slug', (q, s, n) => { })
// Quick Creates a pack from a single zipped instance (but with some supplied data, feeling less lucky?)
router.post('/packs/:slug/qc', (q, s, n) => { })

export default router
