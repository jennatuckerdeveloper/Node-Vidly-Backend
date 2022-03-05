const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const admin = require('../../middleware/auth')
const { Rental, rentalValidator } = require('../../db/models/Rental')
const { Movie } = require('../../db/models/Movie')
const { Customer } = require('../../db/models/Customer')
const Fawn = require('fawn')

const invalidRentalData = (data, res) => {
	const dataValidation = rentalValidator(data)
	if (dataValidation.error) {
		res.status(400).send(dataValidation.error)
		return true
	}
	return false
}

const movieFound = async (id, res) => {
	const movie = await Movie.findById(id)
	if (!movie) {
		res.status(404).send(`Could not find movie with id ${id}.`)
		return false
	}
	return movie
}

const customerFound = async (id, res) => {
	const movie = await Customer.findById(id)
	if (!movie) {
		res.status(404).send(`Could not find movie with id ${id}.`)
		return false
	}
	return movie
}

router.get('/', [auth, admin], async (req, res) => {
	const rentals = await Rental.find({}).sort('name')
	res.send(rentals)
})

router.post('/', auth, async (req, res) => {
	const data = req.body
	if (invalidRentalData(data, res)) return

	const movieId = req.body.movieId
	const movie = await movieFound(movieId, res)
	if (!movie) return
	if (movie.numberInStock < 1) {
		return res.status(400).send('Movie not in stock.')
	}

	const customerId = req.body.customerId
	const customer = await customerFound(customerId, res)
	if (!customer) return

	const newRental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
			isGold: customer.isGold
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate
		}
	})

	try {
		new Fawn.Task()
			.save('rentals', newRental)
			.updateOne('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
			.run()
	} catch (ex) {
		console.log(ex)
		return res.status(500).send('Unexpected failure.')
	}

	res.send(newRental)
})

module.exports = router
