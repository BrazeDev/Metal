"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var express_winston_1 = __importDefault(require("express-winston"));
var helmet_1 = __importDefault(require("helmet"));
var router_1 = __importDefault(require("./api/router"));
var config_1 = require("./util/config");
var logger_1 = __importDefault(require("./util/logger"));
var app = express_1.default();
app.use(express_winston_1.default.logger({
    winstonInstance: logger_1.default,
    level: 'debug',
    meta: true,
    msg: "Request :: HTTP {{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms",
    colorize: true
}));
app.set('trust proxy', 1);
app.use(helmet_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/', router_1.default);
app.use(function (q, s, n) { return s.status(404).json({ status: 404, message: 'The requested route could not be found' }); });
app.use(function (q, s, n) { return s.status(500).json({ status: 500, message: 'The server was unable to process this request' }); });
config_1.initialize.then(function (config) {
    if (config.resetAdminPass) {
        logger_1.default.warn("'resetAdminPass' is set to true. The admin password will be reset.");
        // doPasswordSet();
        logger_1.default.info("Admin password has been reset");
    }
    app.listen(config.port, function () {
        logger_1.default.info("Listening on port " + config.port);
    });
});
