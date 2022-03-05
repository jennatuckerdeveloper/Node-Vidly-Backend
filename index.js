require('express-async-errors')
const debug = require('debug')('app:startup')
const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
Joi.myTestFunc = () => console.log('My test func called')
const mongoose = require('mongoose')
const Fawn = require('fawn')
const morgan = require('morgan')
const helmet = require('helmet')

const auth = require('./middleware/auth')
const admin = require('./middleware/admin')
const error = require('./middleware/error')
const express = require('express')
const homeRouter = require('./routes/home')
const usersRouter = require('./routes/api/users')
const authRouter = require('./routes/api/auth')
const genresRouter = require('./routes/api/genres')
const customersRouter = require('./routes/api/customers')
const moviesRouter = require('./routes/api/movies')
const rentalsRouter = require('./routes/api/rentals')
const app = express()

const dbUrl = 'mongodb://localhost/my-vidly'

// const logger = winston.createLogger({
// 	level: 'info',
// 	format: winston.format.json(),
// 	defaultMeta: { service: 'user-service' },
// 	transports: [
// 		//
// 		// - Write all logs with importance level of `error` or less to `error.log`
// 		// - Write all logs with importance level of `info` or less to `combined.log`
// 		//
// 		new winston.transports.File({ filename: 'error.log', level: 'error' }),
// 		new winston.transports.File({ filename: 'combined.log' })
// 	]
// })

if (!config.get('jwtPrivateKey')) {
	console.log('FATAL ERROR:  jwtPrivateKey is not defined.')
	process.exit(1)
}

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

const dbConnect = async () => {
	try {
		await mongoose.connect(dbUrl)
		console.log(`Connected to MongoDb at ${dbUrl}`)
		Fawn.init(dbUrl)
	} catch (ex) {
		console.log(`Could not connect to MongoDb: ${ex}`)
	}
}

dbConnect()

// Express core middleware
app.use(express.json())

// custom middlware

// Not logged in
app.use('/', homeRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
// Some endpoints available not logged in
app.use('/api/genres', genresRouter)
app.use('/api/movies', moviesRouter)
// No endpoints avaialble not logged in
app.use('/api/rentals', auth, rentalsRouter)
// No endpoints available not logged in and admin
app.use('/api/customers', [auth, admin], customersRouter)

// error handling middleware
app.use(error)

// Configuration
// console.log('Application Name: ' + config.get('name'))
// console.log('Mail Server: ' + config.get('mail.host'))
// console.log('Mail Password: ' + config.get('mail.password'))

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})
