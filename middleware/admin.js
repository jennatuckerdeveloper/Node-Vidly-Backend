const admin = (req, res, next) => {
	if (!req.user.isAdmin)
		return res.status(403).send('User does not have admin permissions.')
	next()
}

module.exports = admin
