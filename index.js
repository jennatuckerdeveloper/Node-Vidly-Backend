const debug = require('debug')('app:startup')
const config = require('config')
const Joi = require('joi')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const logger = require('./middleware/logger')
const express = require('express')
const homeRouter = require('./routes/home')
const genresRouter = require('./routes/api/genres')
const { db } = require('./db/models/Genre')
const app = express()
// External middleware
app.use(helmet())

// Conditional external middleware
const env = app.get('env')
if (env === 'development') {
	app.use(morgan('tiny'))
	debug('Morgan logs running...')
} else {
	debug(`Morgan logs turned off for env "${env}".`)
}

// MongoDB database connection

const dbUrl = 'mongodb://localhost/my-vidly'

const dbConnect = async () => {
	try {
		await mongoose.connect(dbUrl)
		console.log(`Connected to MongoDb at ${dbUrl}`)
	} catch (ex) {
		console.log(`Could not connect to MongoDb: ${ex}`)
	}
}

dbConnect()

// Express core middleware
app.use(express.json())

// Custom middleware
app.use(logger)

app.use('/', homeRouter)
app.use('/api/genres', genresRouter)

// Configuration
// console.log('Application Name: ' + config.get('name'))
// console.log('Mail Server: ' + config.get('mail.host'))
// console.log('Mail Password: ' + config.get('mail.password'))

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})
