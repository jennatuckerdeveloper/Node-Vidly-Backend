const mongoose = require('mongoose')
const Joi = require('Joi')
Joi.objectId = require('joi-objectid')(Joi)

const rentalSchema = mongoose.Schema({
	customer: {
		type: mongoose.Schema({
			name: {
				type: String,
				required: true,
				minLength: 1,
				maxLength: 255
			},
			phone: {
				type: String,
				required: true
			},
			isGold: {
				type: Boolean,
				default: false
			}
		}),
		required: true
	},
	movie: {
		type: mongoose.Schema({
			title: {
				type: String,
				required: true,
				trim: true,
				minLength: 1,
				maxLength: 255
			},
			dailyRentalRate: {
				type: Number,
				min: 0,
				max: 255
			}
		})
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		min: 0
	}
})

const Rental = mongoose.model('Rental', rentalSchema)

const rentalValidator = (data) => {
	const joiOptions = { abortEarly: false }

	const rentalSchema = Joi.object({
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required()
	})

	const validation = rentalSchema.validate(data, joiOptions)
	if (validation.error) {
		const error = validation.error.details.map((e) => e.message)
		return { error: error }
	}
	return { error: null }
}

module.exports = {
	Rental,
	rentalValidator
}
