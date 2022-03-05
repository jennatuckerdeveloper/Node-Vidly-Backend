const error = (err, req, res, next) => {
	res.status(500).send('Unexpected error.')
}

module.exports = error
