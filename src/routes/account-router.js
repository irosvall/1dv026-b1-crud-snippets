/**
 * Account router.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import express from 'express'
import { AccountController } from '../controllers/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

// Map HTTP verbs and route paths to controller actions.
router.get('/registration', controller.registration)
router.post('/register', controller.register)

router.get('/login', controller.login)
router.post('/loginpost', controller.loginpost)

router.get('/logout', controller.logout)
