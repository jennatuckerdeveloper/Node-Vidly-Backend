const logger = require('./startup/logger')
const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/middleware')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/debuggers')()

const port = process.env.PORT || 5000
app.listen(port, () => {
	logger.log('info', `Listening on port ${port}...`)
})
