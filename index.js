const logger = require('./startup/logger')
const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/middleware')(app)
require('./startup/config')()
require('./startup/debuggers')()
require('./startup/db')()

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
	logger.log('info', `Listening on port ${port}...`)
})

module.exports = server
