const winston = require('winston')
winston.remove(winston.transports.Console)
require('winston-mongodb')
require('express-async-errors')

const dbUrl = 'mongodb://localhost/my-vidly'

// winston logger for error middleware

const { format } = winston

const winstonConsoleLogger = new winston.transports.Console()

const createWinstonMongoDbLogger = (collection) => {
	return new winston.transports.MongoDB({
		db: dbUrl,
		options: { useNewUrlParser: true, useUnifiedTopology: true },
		collection: collection ? collection : 'log',
		level: 'error'
	})
}

const logger = winston.createLogger({
	level: 'silly',
	format: winston.format.combine(
		winston.format.colorize({ all: true }),
		winston.format.align(),
		winston.format.printf((info) => `${info.level}: ${info.message}`)
	),
	exitOnError: true,
	transports: [
		winstonConsoleLogger,
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		createWinstonMongoDbLogger()
	],
	exceptionHandlers: [
		winstonConsoleLogger,
		new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
		createWinstonMongoDbLogger('log-uncaughtExceptions')
	],
	rejectionHandlers: [
		winstonConsoleLogger,
		new winston.transports.File({ filename: 'unhandledRejections.log' }),
		createWinstonMongoDbLogger('log-unhandledRejections')
	]
})

module.exports = logger
