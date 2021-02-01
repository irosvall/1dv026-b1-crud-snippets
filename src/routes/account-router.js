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
router.get('/registration', controller.checkIfAnonymous, controller.registration)
router.post('/register', controller.checkIfAnonymous, controller.register)

router.get('/login', controller.checkIfAnonymous, controller.login)
router.post('/loginpost', controller.checkIfAnonymous, controller.loginpost)

router.get('/logout', controller.checkIfLoggedIn, controller.logout)
