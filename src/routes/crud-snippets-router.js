/**
 * Crud snippets router.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import express from 'express'
import { CrudSnippetsController } from '../controllers/crud-snippets-controller.js'

export const router = express.Router()

const controller = new CrudSnippetsController()

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)

router.get('/new', controller.index)
router.post('/create', controller.create)

router.get('/:id/remove', controller.remove)
router.post('/:id/delete', controller.delete)
