const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const validId = require('../../middleware/validId')
const { Genre, genreValidator } = require('../../db/models/Genre')

router.get('/', async (req, res) => {
	const genres = await Genre.find({}).sort('name')
	res.send(genres)
})

router.get('/:id', validId, async (req, res) => {
	const id = req.params.id
	const genre = await Genre.findById(id)
	if (!genre) {
		return res.status(404).send(`Could not find genre with ID ${id}.`)
	}
	res.send(genre)
})

router.post('/', [auth, admin], async (req, res) => {
	const data = req.body
	const dataValidation = genreValidator(data)
	if (dataValidation.error) {
		return res.status(400).send(dataValidation.error)
	}
	const newGenreData = { name: data.name }
	const newGenre = new Genre(newGenreData)
	await newGenre.save()
	res.send(newGenre)
})

router.put('/:id', [auth, admin, validId], async (req, res) => {
	const id = req.params.id
	const data = req.body
	const dataValidation = genreValidator(data)
	if (dataValidation.error) {
		return res.status(400).send(dataValidation.error)
	}
	const updatedGenreData = { name: data.name }
	const updatedGenre = await Genre.findByIdAndUpdate(id, updatedGenreData, {
		new: true
	})
	if (!updatedGenre) {
		return res.status(404).send(`Could not update genre with ID ${id}.`)
	}
	res.send(updatedGenre)
})

router.delete('/:id', [auth, admin, validId], async (req, res) => {
	const id = req.params.id
	const deletedGenre = await Genre.findByIdAndDelete(id)
	if (!deletedGenre) {
		return res.status(404).send(`Could not find genre with ID ${id}.`)
	}
	res.send(deletedGenre)
})

module.exports = router
