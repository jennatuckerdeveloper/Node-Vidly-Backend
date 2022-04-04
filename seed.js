const { Genre } = require('./db//models/Genre')
const { Movie } = require('./db/models/Movie')
const mongoose = require('mongoose')
const config = require('config')

const data = [
	{
		name: 'Comedy',
		movies: [
			{ title: 'Groundhog Day', numberInStock: 5, dailyRentalRate: 2 },
			{ title: 'Modern Times', numberInStock: 4, dailyRentalRate: 2 },
			{ title: 'Office Space', numberInStock: 15, dailyRentalRate: 2 }
		]
	},
	{
		name: 'Action',
		movies: [
			{ title: 'Aliens', numberInStock: 5, dailyRentalRate: 2 },
			{ title: 'Terminator', numberInStock: 10, dailyRentalRate: 2 },
			{ title: 'Tomb Raider', numberInStock: 15, dailyRentalRate: 2 }
		]
	},
	{
		name: 'Indie',
		movies: [
			{ title: 'Happy Go Lucky', numberInStock: 5, dailyRentalRate: 2 },
			{ title: 'Kajillionaire', numberInStock: 10, dailyRentalRate: 2 },
			{
				title: 'Portrait Of A Lady On Fire',
				numberInStock: 15,
				dailyRentalRate: 2
			}
		]
	},
	{
		name: 'Horror',
		movies: [
			{ title: 'Get Out', numberInStock: 5, dailyRentalRate: 2 },
			{ title: 'Let The Right One In', numberInStock: 15, dailyRentalRate: 2 },
			{
				title: 'Night Of The Living Dead',
				numberInStock: 10,
				dailyRentalRate: 2
			}
		]
	}
]

async function seed() {
	await mongoose.connect(config.get('db'))

	// Clear genre and movie collections in the db.
	await Movie.deleteMany({})
	await Genre.deleteMany({})

	// Populate genre and movie collections in db.
	for (let genre of data) {
		const { _id: genreId } = await new Genre({ name: genre.name }).save()
		const movies = genre.movies.map((movie) => ({
			...movie,
			genre: { _id: genreId, name: genre.name }
		}))
		await Movie.insertMany(movies)
	}

	mongoose.disconnect()

	console.info(`Seed data loaded to ${config.get('db')}!`)
}

seed()
