const winston = require('winston')
winston.remove(winston.transports.Console)
require('winston-mongodb')
require('express-async-errors')
const config = require('config')
const dbUrl = config.get('db')
const env = process.env.NODE_ENV

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
		new winston.transports.File({ filename: 'error.log', level: 'error' })
	],
	exceptionHandlers: [
		winstonConsoleLogger,
		new winston.transports.File({ filename: 'uncaughtExceptions.log' })
	],
	rejectionHandlers: [
		winstonConsoleLogger,
		new winston.transports.File({ filename: 'unhandledRejections.log' })
	]
})

// Jest test environment will error with winston-mongodb
if (env !== 'test') {
	logger.add(createWinstonMongoDbLogger())
	logger.exceptions.handle(createWinstonMongoDbLogger('log-uncaughtExceptions'))
	looger.rejections.handle(
		createWinstonMongoDbLogger('log-unhandledRejections')
	)
}

module.exports = logger
