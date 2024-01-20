const {asyncErrorHandler} = require('../index');

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

    it('should call the next function with the result if the promise resolves', async () => {
        const fn = jest.fn().mockResolvedValue('Test Result');
        const req = {};
        const res = {};
        const next = jest.fn();
        const asyncFn = asyncErrorHandler(fn);
        await asyncFn(req, res, next);
        expect(next).toHaveBeenCalledWith('Test Result');
    });
    
});