"use strict";

exports.winstonSetup = function() {
    // helps to setup winston logger without cluttering index.js

    var winston = require('winston');
     
    winston.add(winston.transports.File, { filename: './programOutput.log' });

    winston.remove(winston.transports.Console)
    winston.add(winston.transports.Console, {
        level: 'info',
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: true,
        json: true
    });

    return winston
}