const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../../db/models/User')
const authValidator = require('../../db/models/authValidator')

const invalidAuthData = (data, res) => {
	const dataValidation = authValidator(data)
	if (dataValidation.error) {
		res.status(400).send(dataValidation.error)
		return true
	}
	return false
}

router.post('/', async (req, res) => {
	const data = req.body
	if (invalidAuthData(data, res)) return
	const user = await User.findOne({ email: data.email })
	if (!user) return res.status(400).send('Username or password incorrect.')
	const validPassword = await bcrypt.compare(data.password, user.password)
	if (!validPassword)
		return res.status(400).send('Username or password incorrect.')
	const token = user.generateAuthToken()
	res.send(token)
})

module.exports = router
