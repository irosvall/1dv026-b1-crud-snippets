/**
 * Crude snippets router.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import express from 'express'
import { CrudeSnippetsController } from '../controllers/crude-snippets-controller.js'

export const router = express.Router()

const controller = new CrudeSnippetsController()

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)
