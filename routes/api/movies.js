const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const admin = require('../../middleware/auth')
const { Movie, movieValidator } = require('../../db/models/Movie')
const { Genre } = require('../../db/models/Genre')
const { dbIdValidator } = require('../../db/models/dbIdValidator')

// resusable helpers

const inValidMovieId = (id, res) => {
	const isValid = dbIdValidator(id)
	if (!isValid) {
		res.status(400).send('Not a valid movie id.')
		return true
	}
	return false
}

const invalidMovieData = (data, res) => {
	const dataValidation = movieValidator(data)
	if (dataValidation.error) {
		res.status(400).send(dataValidation.error)
		return true
	}
	return false
}

const genreFound = async (id, res) => {
	const genre = await Genre.findById(id)
	if (!genre) {
		res.status(404).send(`Cannot find genre with id ${id}`)
		return false
	}
	return genre
}

const movieFound = async (id, res) => {
	const movie = await Movie.findById(id)
	if (!movie) {
		res.status(404).send(`Could not find movie with id ${id}.`)
		return false
	}
	return movie
}

// calls

router.get('/', async (req, res) => {
	const movies = await Movie.find({}).sort('title')
	res.send(movies)
})

router.get('/:id', async (req, res) => {
	const id = req.params.id
	if (inValidMovieId(id, res)) return
	const movie = await movieFound(id, res)
	if (!movie) return
	res.send(movie)
})

router.post('/', [auth, admin], async (req, res) => {
	const data = req.body
	if (invalidMovieData(data, res)) return
	const genreId = req.body.genreId
	const genre = await genreFound(genreId, res)
	if (!genre) return
	const newMovie = new Movie({
		title: data.title,
		genre: { _id: genre._id, name: genre.name },
		numberInStock: data.numberInStock,
		dailyRentalRate: data.dailyRentalRate
	})
	await newMovie.save()
	res.send(newMovie)
})

router.put('/:id', [auth, admin], async (req, res) => {
	const id = req.params.id
	if (inValidMovieId(id, res)) return
	const data = req.body
	if (invalidMovieData(data, res)) return

	const movie = await movieFound(id, res)
	if (!movie) return

	const genreId = req.body.genreId
	const genre = await genreFound(genreId, res)
	if (!genre) return

	const updatedMovieData = {
		title: data.title,
		genre: { _id: genre._id, name: genre.name },
		numberInStock: data.numberInStock,
		dailyRentalRate: data.dailyRentalRate
	}
	const updatedMovie = await Movie.findByIdAndUpdate(id, updatedMovieData, {
		new: true
	})
	res.send(updatedMovie)
})

router.delete('/:id', [auth, admin], async (req, res) => {
	const id = req.params.id
	if (inValidMovieId(id, res)) return
	const movie = await movieFound(id, res)
	if (!movie) return
	const deletedMovie = await Movie.findByIdAndDelete(id)
	res.send(deletedMovie)
})

module.exports = router
