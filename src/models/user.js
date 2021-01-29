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

// Salts and hashes the password before save.
schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

// Create a model using the schema.
export const User = mongoose.model('User', schema)
