/**
 * Mongoose model snippet.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    minlength: [1, 'The message must contain at least one character.'],
    maxlength: [4000, 'The message has extended the limit of {MAXLENGHT} characters.']
  }
}, {
  timestamps: true
})

// Create a model using the schema.
export const Snippet = mongoose.model('Snippet', schema)
