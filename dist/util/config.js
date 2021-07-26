"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
/* If you're looking for the config options, check braze.config.json in the root
   directory of this project. This file contains code for management and loading
   of the config file and the options inside it - do *NOT* edit this unless you
   know what you're doing. To change the location where the config file will be
   searched for, you can provide the environment variable `CONFIG_PATH` or run
   the app with the `--config=/path/to/config` argument */
var fs_1 = __importDefault(require("fs"));
var minimist_1 = __importDefault(require("minimist"));
var logger_1 = __importDefault(require("./logger"));
var args = minimist_1.default(process.argv.slice(2));
var configFile;
var configPath = '';
var metadata = {};
var loadConfiguration = new Promise(function (resolve, reject) {
    if (typeof process.env.CONFIG_PATH !== 'undefined') {
        configPath = process.env.CONFIG_PATH;
    }
    else if (typeof args.config !== 'undefined') {
        configPath = args.config;
    }
    else {
        configPath = '../../braze.config.json';
    }
    try {
        configFile = require(configPath);
    }
    catch (e) {
        reject("Unable to read config. You can specify a custom location with the \"CONFIG_PATH\" env var, or the \"--config\" cmd line argument. You can also use the command \"npm genconf\" to generate a config file. Error: " + e);
    }
    try {
        metadata = require('../../braze.meta.json');
    }
    catch (e) {
        reject("Failed to find \"metadata.json\". Please re-clone the repo or re-download Braze. Error: " + e);
    }
    resolve(configFile);
});
var verifyConfiguration = new Promise(function (resolve, reject) {
    if (!(configFile.bind.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/) ||
        configFile.bind.match(/((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])/))) {
        reject("Malformed bind address, must be a valid IPv4 or IPv6 address. Got \"" + configFile.bind + "\"");
    }
    if (!(configFile.port >= 1 && configFile.port <= 65535)) {
        reject("Malformed port - must be between 1 and 65535. Got \"" + configFile.port + "\"");
    }
    if (configFile.jwtSecret === 'XwD48UY5ymQJuMP_This_is_an_example_key_do_not_use_NZJhKLJrUDa5S8W') {
        if (configFile.debug) {
            logger_1.default.crit('The JWT secret has not be changed. Keeping the default value creates a serious risk of intrusion.');
        }
        else {
            reject('The JWT secret has not be changed. Keeping the default value creates a serious risk of intrusion. Braze will now exit.');
        }
    }
    if (configFile.jwtSecret.toString().length < 32) {
        reject('The JWT secret must be at least 32 chars. Keys longer than 256 chars may cause performance issues. Braze will now exit.');
    }
    resolve(configFile);
});
var initEnvironment = new Promise(function (resolve, reject) {
    process.env.NODE_ENV = configFile.debug ? 'debug' : 'production';
    resolve(configFile);
});
var initDirectories = new Promise(function (resolve, reject) {
    var work = configFile.folders.work;
    if (!fs_1.default.existsSync(work)) {
        logger_1.default.info("Creating work directory at: " + work);
        fs_1.default.mkdirSync(work);
    }
    try {
        fs_1.default.accessSync(work, fs_1.default.constants.W_OK);
    }
    catch (e) {
        reject("Work directory \"" + work + "\" is not writable");
    }
    var repo = configFile.folders.repo;
    if (!fs_1.default.existsSync(repo)) {
        logger_1.default.info("Creating repo directory at: " + repo);
        fs_1.default.mkdirSync(repo);
    }
    try {
        fs_1.default.accessSync(repo, fs_1.default.constants.W_OK);
    }
    catch (e) {
        reject("Repo directory \"" + repo + "\" is not writable");
    }
    resolve(configFile);
});
exports.initialize = new Promise(function (resolve, _) {
    loadConfiguration.then(function () {
        logger_1.default.info("Loaded configuration from " + configPath);
        verifyConfiguration.then(function () {
            logger_1.default.info("Verified configuration file");
            initEnvironment.then();
            initDirectories.then(function (config) {
                logger_1.default.info("Configuration file accepted");
                resolve(config);
            }, function (e) {
                logger_1.default.emerg(e);
                process.exit(3);
            });
        }, function (e) {
            logger_1.default.emerg(e);
            process.exit(2);
        });
    }, function (e) {
        logger_1.default.emerg(e);
        process.exit(1);
    });
});
