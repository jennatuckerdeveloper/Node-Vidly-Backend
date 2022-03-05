const morgan = require('morgan')
const helmet = require('helmet')
const logger = require('./logger')

module.exports = function (app) {
	// External middleware
	app.use(helmet())

	// Conditional external middleware
	const env = app.get('env')
	if (env === 'development') {
		app.use(morgan('tiny'))
		logger.log('info', 'Morgan logs running...')
	} else {
		logger.log('info', `Morgan logs turned off for env "${env}".`)
	}
}
