const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

const dbUrl = 'mongodb://localhost/my-vidly'

// winston logger for error middleware

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({ format: winston.format.simple() }),
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.MongoDB({
			db: dbUrl,
			options: { useNewUrlParser: true, useUnifiedTopology: true },
			collection: 'log-uncaughtException',
			level: 'error'
		})
	],
	exceptionHandlers: [
		new winston.transports.Console({ format: winston.format.simple() }),
		new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
		new winston.transports.MongoDB({
			db: dbUrl,
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			},
			level: 'error'
		})
	]
})

module.exports = logger
