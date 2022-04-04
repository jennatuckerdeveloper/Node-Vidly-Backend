const cors = require('cors')

module.exports = function (app) {
	const whitelist = [
		'http://localhost:3000',
		'https://gentle-ravine-70551.herokuapp.com'
	]
	const corsOptions = {
		origin: function (origin, callback) {
			if (
				whitelist.indexOf(origin) !== -1 ||
				(!origin && process.env.NODE_ENV === 'test')
			) {
				callback(null, true)
			} else {
				console.log('ORIGIN', origin)
				callback(new Error('Not allowed by CORS'))
			}
		}
	}
	app.use(cors(corsOptions))
}
