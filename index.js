const express = require('express')
// using express instead of http 'http = require('http')'
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
