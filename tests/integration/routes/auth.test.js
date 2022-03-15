const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { User } = require('../../../db/models/User')
const userUrl = '/api/users'

// returns valid json web token for correct email and password
// check on not isAdmin user that there's no isAdmin in the token
// check on isAdmin user for inlcusion in the token

// errors without email
// errors without password

// sends 400 if user cannot be found in db by email
// ambiguous message
// sends 400 if incorrect password
// ambiguous message
