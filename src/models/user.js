/**
 * Mongoose model user.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'

// Create a schema.
const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: '{VALUE} is already taken.',
    required: 'A {PATH} is required.',
    maxlength: [25, 'The {PATH} has extended the limit of {MAXLENGTH} characters.'],
    validate: [validator.isAlphanumeric, '{PATH} is only allowed to contain numbers and letters (a-z)']
  },
  password: {
    type: String,
    required: 'A {PATH} is required.',
    minlength: [6, 'The {PATH} must contain at least {MINLENGTH} characters.'],
    maxlength: [2000, 'The {PATH} has extended the limit of {MAXLENGTH} characters.']
  },
  email: {
    type: String,
    unique: '{VALUE} is already in use.',
    required: 'A {PATH} is required.',
    validate: [validator.isEmail, '{PATH} is not valid']
  }
}, {
  timestamps: true
})

// Customizes the error message for unique value errors on username, and email.
schema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    const errorKeyValue = error.keyValue
    if (Object.prototype.hasOwnProperty.call(errorKeyValue, 'username')) {
      next(new Error('The username is already in use.'))
    } else {
      next(new Error('The email address is already in use.'))
    }
  } else {
    next()
  }
})

// Salts and hashes the password before save.
schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

/**
 * Authenticates a user.
 *
 * @param {string} username - A username.
 * @param {string} password - A password.
 * @returns {Promise} A promise that resolves into an object representing the user.
 */
schema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Usernamn or password is wrong.')
  }

  return user
}

// Create a model using the schema.
export const User = mongoose.model('User', schema)
