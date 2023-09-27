'use strict';

const developmentEnvHandler = (error, req, res, logger) => {
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

const productionEnvHandler = (error, req, res, logger) => {
    if (logger) {
        logger.error({ request: req.method, location: req.url, statusCode: error.statusCode, message: error.message });
    } else {
        console.error(`[${req.method} ${req.url}] ${error.statusCode} - ${error.message}`);
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
        developmentEnvHandler(error, req, res, logger)
    } else {
        productionEnvHandler(error, req, res, logger)
    }
}

module.exports = errorHandler