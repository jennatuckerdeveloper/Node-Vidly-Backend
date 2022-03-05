const express = require('express')
const homeRouter = require('../routes/home')
const usersRouter = require('../routes/api/users')
const authRouter = require('../routes/api/auth')
const genresRouter = require('../routes/api/genres')
const customersRouter = require('../routes/api/customers')
const moviesRouter = require('../routes/api/movies')
const rentalsRouter = require('../routes/api/rentals')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const error = require('../middleware/error')
const logger = require('./logger')

module.exports = function (app) {
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
	app.use(error(logger))
}
