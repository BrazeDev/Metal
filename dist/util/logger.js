"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var levels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warn: 4,
    notice: 5,
    info: 6,
    debug: 7
};
var colors = {
    emerg: 'yellow redBG',
    alert: 'red yellowBG',
    crit: 'magenta',
    error: 'red',
    warn: 'yellow',
    notice: 'green',
    info: 'blue',
    debug: 'cyan'
};
var level = function () {
    var env = process.env.NODE_ENV || 'development';
    return (env === 'development') ? 'debug' : 'warn';
};
var format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf(function (info) { return "[" + info.timestamp + "] " + info.level + ": " + info.message; }));
var transports = [
    new winston_1.default.transports.Console()
];
winston_1.default.addColors(colors);
var logger = winston_1.default.createLogger({
    level: level(),
    levels: levels,
    format: format,
    transports: transports
});
exports.default = logger;
