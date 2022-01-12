import express, { Request, Response } from 'express'
import { createUserHandler, whoamiHandler } from './controllers/user.controller'
import { getUserSessionsHandler, createUserSessionHandler, deleteSessionHandler } from './controllers/session.controller'
import {
//    getModsHandler,
  getModHandler,
  getModVersionHandler,
  createModHandler,
  createModVersionHandler,
  deleteModHandler,
  deleteModVersionHandler,
  updateModHandler,
  updateModVersionHandler
} from './controllers/mod.controller'
import { createUserSchema } from './schemas/user.schema'
import { createSessionSchema } from './schemas/session.schema'
import validateResource from './middleware/validateResource'
import requireUser from './middleware/requireUser'
import { createModSchema, deleteModSchema, getModSchema, updateModSchema, updateModVersionSchema } from './schemas/mod.schema'

const router = express.Router()

/**
 * @openapi
 * '/api/health':
 *   get:
 *     tags:
 *     - Health
 *     summary: Enpoint to check basic health
 *     description: Responds with a 200 if the app is running
 *     responses:
 *       200:
 *         description: Braze Metal is running
 */
router.get('/health', (q: Request, s: Response) => s.sendStatus(200))

/**
 * @openapi
 * '/api/users':
 *   post:
 *     tags:
 *     - User
 *     summary: Register a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       200:
 *         description: Account successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict
 */
router.post('/users', validateResource(createUserSchema), createUserHandler)

/**
 * @openapi
 * '/api/whoami':
 *   get:
 *     tags:
 *     - User
 *     summary: Returns the username of the currently logged in user
 *     responses:
 *       200:
 *         description: Logged in
 *       403:
 *         description: Not logged in
 */
router.get('/whoami', requireUser, whoamiHandler)

/**
 * @openapi
 * '/api/sessions':
 *   get:
 *     tags:
 *     - Session
 *     summary: List sessions for the currently logged in user
 *     responses:
 *       200:
 *         description: Logged on sessions
 *       401:
 *         description: Not logged in
 */
router.get('/sessions', requireUser, getUserSessionsHandler)

/**
 * @openapi
 * '/api/sessions':
 *   post:
 *     tags:
 *     - Session
 *     summary: Create a session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSession'
 *     responses:
 *       200:
 *         description: Session successfully created
 *       400:
 *         description: Incorrect username/password
 */
router.post('/sessions', validateResource(createSessionSchema), createUserSessionHandler)

/**
 * @openapi
 * '/api/sessions':
 *   delete:
 *     tags:
 *     - Session
 *     summary: Invalidate a session
 *     responses:
 *       200:
 *         description: Session successfully invalidated
 *       401:
 *         description: Not logged in
 */
router.delete('/sessions', requireUser, deleteSessionHandler)

router.get('/mods', requireUser)

// router.get('/mods/list/:page', requireUser, getModsHandler)

/**
 * @openapi
 * '/api/mods/{slug}':
 *   get:
 *     tags:
 *     - Mods
 *     summary: Get info about a mod
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug (modID) of the mod
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetModResponse'
 *       401:
 *         description: Not logged in
 *       404:
 *         description: Mod doesn't exist
 */
router.get('/mods/:slug', [requireUser, validateResource(getModSchema)], getModHandler)

/**
 * @openapi
 * '/api/mods/{slug}':
 *   post:
 *     tags:
 *     - Mods
 *     summary: Create a mod
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug (modID) of the mod
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModInput'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateModResponse'
 *       401:
 *         description: Not logged in
 */
router.post('/mods/:slug', [requireUser, validateResource(createModSchema)], createModHandler)

/**
 * @openapi
 * '/api/mods/{slug}':
 *   delete:
 *     tags:
 *     - Mods
 *     summary: Delete a mod
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug (modID) of the mod
 *     responses:
 *       200:
 *         description: Ok             
 *       401:
 *         description: Not logged in
 *       404:
 *         description: Mod doesn't exist
 */
router.delete('/mods/:slug', [requireUser, validateResource(deleteModSchema)], deleteModHandler)

/**
 * @openapi
 * '/api/mods/{slug}':
 *   put:
 *     tags:
 *     - Mods
 *     summary: Update a mod
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug (modID) of the mod
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModInput'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateModResponse'
 *       401:
 *         description: Not logged in
 */
router.put('/mods/:slug', [requireUser, validateResource(updateModSchema)], updateModHandler)

/**
 * @openapi
 * '/api/mods/{slug}/{version}':
 *   get:
 *     tags:
 *     - Mods
 *     summary: Get info about a mod version
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug (modID) of the mod version
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Version of the mod version
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetModVersionResponse'
 *       401:
 *         description: Not logged in
 *       404:
 *         description: Mod version doesn't exist
 */
router.get('/mods/:slug/:version', requireUser, getModVersionHandler)

/**
 * @openapi
 * '/api/mods/{slug}/{version}':
 *   post:
 *     tags:
 *     - Mods
 *     summary: Create a mod version
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug (modID) of the mod version
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Version of the mod version
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModVersionInput'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateModVersionResponse'
 *       401:
 *         description: Not logged in
 */
router.post('/mods/:slug/:version', requireUser, createModVersionHandler)

/**
 * @openapi
 * '/api/mods/{slug}/{version}':
 *   delete:
 *     tags:
 *     - Mods
 *     summary: Delete a mod version
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug (modID) of the mod version
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Version of the mod version
 *     responses:
 *       200:
 *         description: Ok             
 *       401:
 *         description: Not logged in
 *       404:
 *         description: Mod version doesn't exist
 */
router.delete('/mods/:slug/:version', requireUser, deleteModVersionHandler)

/**
 * @openapi
 * '/api/mods/{slug}/{version}':
 *   put:
 *     tags:
 *     - Mods
 *     summary: Update a mod version
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug (modID) of the mod version
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Version of the mod version
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModVersionInput'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateModVersionResponse'
 *       401:
 *         description: Not logged in
 */
router.put('/mods/:slug/:version', [requireUser, validateResource(updateModVersionSchema)], updateModVersionHandler)

export default router
