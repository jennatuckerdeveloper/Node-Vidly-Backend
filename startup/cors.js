const cors = require('cors')

module.exports = function (app) {
	const whitelist = [
		'http://localhost:3000',
		'https://gentle-ravine-70551.herokuapp.com'
	]
	const corsOptions = {
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	}
	app.use(cors(corsOptions))
}
