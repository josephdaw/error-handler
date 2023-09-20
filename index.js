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

// https://www.youtube.com/watch?v=xnedbgDoRkA&list=PL1BztTYDF-QPdTvgsjf8HOwO4ZVl_LhxS&index=93
const asyncErrorHandler = fn => {
    return (req, res, next) => fn(req, res, next)
    // .then(result => next(result))
    .catch(err => next(err))
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

module.exports = { errorHandler, CustomError, asyncErrorHandler };