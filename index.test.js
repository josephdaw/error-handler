const {errorHandler, CustomError, asyncErrorHandler} = require('./index');

describe('errorHandler', () => {
    it('should log errors to a custom logger', () => {
        const logger = {
            error: jest.fn()
        };
        const err = new Error('Test Error');
        const req = { method: 'GET', url: '/test' };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        errorHandler(err, req, res, next, logger);
        expect(logger.error).toHaveBeenCalledWith({request: 'GET', location: '/test', statusCode: 500, message: 'Test Error'});
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
    });

    it('should log errors to the console if no logger is provided', () => {
        const consoleError = console.error;
        console.error = jest.fn();
        const err = new Error('Test Error');
        const req = { method: 'GET', url: '/test' };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        errorHandler(err, req, res, next);
        expect(console.error).toHaveBeenCalledWith('[GET /test] 500 - Test Error');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        console.error = consoleError;
    });
});

describe('asyncErrorHandler', () => {
    it('should call the next function with an error if the promise rejects', async () => {
        const fn = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = {};
        const res = {};
        const next = jest.fn();
        const asyncFn = asyncErrorHandler(fn);
        await asyncFn(req, res, next);
        expect(next).toHaveBeenCalledWith(new Error('Test Error'));
    });

    it.skip('should call the next function with the result if the promise resolves', async () => {
        const fn = jest.fn().mockResolvedValue('Test Result');
        const req = {};
        const res = {};
        const next = jest.fn();
        const asyncFn = asyncErrorHandler(fn);
        await asyncFn(req, res, next);
        expect(next).toHaveBeenCalledWith('Test Result');
    });
});

describe('CustomError', () => {
    it('should set the statusCode, status, and isOperational properties correctly', () => {
        const err = new CustomError('Test Error', 400);
        expect(err.statusCode).toBe(400);
        expect(err.status).toBe('fail');
        expect(err.isOperational).toBe(true);
    });

    it('should set the statusCode, status, and isOperational properties correctly for a 500 status code', () => {
        const err = new CustomError('Test Error', 500);
        expect(err.statusCode).toBe(500);
        expect(err.status).toBe('error');
        expect(err.isOperational).toBe(true);
    });

    it('should set the message property correctly', () => {
        const err = new CustomError('Test Error', 400);
        expect(err.message).toBe('Test Error');
    });

    it('should set the stack property correctly', () => {
        const err = new CustomError('Test Error', 400);
        expect(err.stack).toBeDefined();
    });
});
