/**
 * Module for the accountController.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 * Encapsulates the account controller.
 */
export class AccountController {
  /**
   * Returns a HTML form to register a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async registration (req, res, next) {
    try {
      res.render('accounts/registration')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register (req, res) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      })

      await user.save()

      req.session.flash = { type: 'success', text: 'Your account was created successfully.' }
      res.redirect('./login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./registration')
    }
  }

  /**
   * Returns a HTML form for logging in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      console.log('login')
      res.render('accounts/login')
    } catch (error) {
      next(error)
    }
  }
}