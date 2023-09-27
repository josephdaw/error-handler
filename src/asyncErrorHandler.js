'use strict'

// https://www.youtube.com/watch?v=xnedbgDoRkA&list=PL1BztTYDF-QPdTvgsjf8HOwO4ZVl_LhxS&index=93
const asyncErrorHandler = fn => {
    return (req, res, next) => fn(req, res, next)
    // .then(result => next(result))
    .catch(err => next(err))
}

module.exports = asyncErrorHandler