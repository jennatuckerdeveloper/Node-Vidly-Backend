const logger = require('./startup/logger')
const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/morgan')(app)
require('./startup/config')()
require('./startup/debuggers')()
require('./startup/db')()
require('./startup/prod')(app)

let port = process.env.PORT || 5000
if (process.env.NODE_ENV === 'test') {
	port = 0
}
const server = app.listen(port, () => {
	logger.log('info', `Listening on port ${port}...`)
})

module.exports = server
