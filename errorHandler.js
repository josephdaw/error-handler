'use strict';

const developmentEnvHandler = (res, error, logger) => {
    if (logger) {
        logger.error({ request: req.method, location: req.url, statusCode, message });
    } else {
        console.error(`[${req.method} ${req.url}] ${statusCode} - ${message}`);
    }
    
    res.status(error.statusCode).json({
        status: error.status,
        statusCode: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error
    })
}

const productionEnvHandler = (res, error, logger) => {
    if (logger) {
        logger.error({ request: req.method, location: req.url, statusCode, message });
    } else {
        console.error(`[${req.method} ${req.url}] ${statusCode} - ${message}`);
    }

    res.status(error.statusCode).json({
        status: error.status,
        statusCode: error.statusCode,
        message: error.message
    })
}

function errorHandler(error, req, res, next, logger) {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Internal Server Error';

    if (process.env.NODE_ENV === 'development'){
        developmentEnvHandler(res, error, logger)
    } else {
        productionEnvHandler(res, error, logger)
    }
}

module.exports = errorHandler