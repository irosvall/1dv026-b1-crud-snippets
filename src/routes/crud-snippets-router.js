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

router.post('/create', controller.authorize, controller.create)

router.get('/:id/edit', controller.authorize, controller.edit)
router.post('/:id/update', controller.authorize, controller.update)

router.get('/:id/remove', controller.authorize, controller.remove)
router.post('/:id/delete', controller.authorize, controller.delete)
