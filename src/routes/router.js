/**
 * The routers.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as crudSnippetsRouter } from './crud-snippets-router.js'
import { router as accountRouter } from './account-router.js'

export const router = express.Router()

console.log('router')

router.use('/', crudSnippetsRouter)
router.use('/account', accountRouter)

// Catch 404.
router.use('*', (req, res, next) => next(createError(404)))
