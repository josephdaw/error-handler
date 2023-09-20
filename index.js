"use strict";

function errorHandler(err, req, res, next, logger) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    if (logger) {
        logger.error({ request: req.method, location: req.url, statusCode, message });
    } else {
        console.error(`[${req.method} ${req.url}] ${statusCode} - ${message}`);
    }

    res.status(statusCode).json({ error: message });
}

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 400 = fail, 500 = error
        this.isOperational = true; // for operational errors

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { errorHandler, CustomError };