// const morgan = require('morgan')
const logger = require('./logger')

// morgan.token('body', req => JSON.stringify(req.body))

// const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = {
    // morganLogger,
    requestLogger,
    unknownEndpoint,
    errorHandler,
}
