const errorHandler = require('./index');

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
        expect(res.json).toHaveBeenCalledWith({ error: 'Test Error' });
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
        expect(res.json).toHaveBeenCalledWith({ error: 'Test Error' });
        console.error = consoleError;
    });
});
