"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var meta_controller_1 = __importDefault(require("./controllers/meta.controller"));
var router = express_1.default.Router();
/**
 * Solder Compatability Endpoints
 */
router.get('/', function (q, s, n) { return meta_controller_1.default.solderVersion(q, s, n); });
router.get('/verify', function (q, s, n) { });
router.get('/verify/:key', function (q, s, n) { });
/**
 * Braze Information Endpoints
 */
router.get('/info', function (q, s, n) { return meta_controller_1.default.brazeVersion(q, s, n); });
router.get('/v1/', function (q, s, n) { return meta_controller_1.default.brazeVersion(q, s, n); });
/**
 * User Auth Endpoints
 */
router.post('/auth/login', function (q, s, n) { });
router.post('/auth/register', function (q, s, n) { });
router.get('/auth/user', function (q, s, n) { });
/**
 * Token Auth Endpoints
 */
router.get('/keys/:page', function (q, s, n) { });
router.put('/keys/:key', function (q, s, n) { });
router.delete('/keys/:key', function (q, s, n) { });
/**
 * Mod Endpoints
 */
// Lists meta-info about the mods (count, total versions, latest, etc.)
router.get('/mods/', function (q, s, n) { });
// Gets a list of mods & their data on a page-by-page basis
router.get('/mods/list/:page', function (q, s, n) { });
// Gets info about the mod with the supplied slug
router.get('/mods/:slug', function (q, s, n) { });
// Gets info about the mod with the supplied slug
router.get('/mods/:slug/:vers', function (q, s, n) { });
// Creates a mod with the supplied slug
router.post('/mods/:slug/:vers', function (q, s, n) { });
// Deletes the mod with the supplied slug
router.delete('/mods/:slug/:vers', function (q, s, n) { });
// Identifies what has been uploaded and returns information about the uploaded .zip/.jar/etc.
router.post('/mods/id', function (q, s, n) { });
/**
 * Modpack Endpoints
 */
// Does some real-life magic! (takes instance .zip and creates mods/pack from it)
router.post('/packs/imfeelinglucky', function (q, s, n) { });
// Lists meta-info about the packs (count, total versions, latest, etc.)
router.get('/packs/', function (q, s, n) { });
// Gets a list of packs and basic pertinent data on a page-by-page basis
router.get('/packs/list/:page', function (q, s, n) { });
// Gets info about the pack with the supplied slug
router.get('/packs/:slug', function (q, s, n) { });
// Creates a pack with the supplied slug
router.post('/packs/:slug', function (q, s, n) { });
// Deletes the pack with the supplied slug
router.delete('/packs/:slug', function (q, s, n) { });
// Quick Creates a pack from a single zipped instance (but with some supplied data, feeling less lucky?)
router.post('/packs/:slug/qc', function (q, s, n) { });
exports.default = router;
