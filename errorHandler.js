"use strict";

function errorHandler(err, req, res, next, logger) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    if (logger) {
        logger.error({ request: req.method, location: req.url, statusCode, message });
    } else {
        console.error(`[${req.method} ${req.url}] ${statusCode} - ${message}`);
    }

    res.status(statusCode).json({ message });
}

module.exports = errorHandler