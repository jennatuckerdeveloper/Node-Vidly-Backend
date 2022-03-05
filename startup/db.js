const mongoose = require('mongoose')
const Fawn = require('fawn')
const logger = require('./logger')
const dbUrl = 'mongodb://localhost/my-vidly'

module.exports = function () {
	mongoose
		.connect(dbUrl)
		.then(() => Fawn.init(dbUrl))
		.then(() => logger.log('info', `Connected to MongoDb at ${dbUrl}`))
}
