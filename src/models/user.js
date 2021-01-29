/**
 * Mongoose model user.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail'

// Create a schema.
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: 'A {PATH} is required.',
    trim: true
  },
  password: {
    type: String,
    required: 'A {PATH} is required.',
    minlength: [6, 'The {PATH} must contain at least {MINLENGHT} characters.'],
    maxlength: [2000, 'The {PATH} has extended the limit of {MAXLENGHT} characters.']
  },
  email: {
    type: String,
    unique: true,
    required: 'A {PATH} is required.',
    validate: [isEmail, '{PATH} is not valid']
  }
}, {
  timestamps: true,
  versionKey: false
})

// Create a model using the schema.
export const User = mongoose.model('User', schema)
