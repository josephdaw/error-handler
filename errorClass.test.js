const {CustomError} = require('./index');

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
