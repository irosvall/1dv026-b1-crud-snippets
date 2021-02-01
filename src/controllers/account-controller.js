/**
 * Module for the accountController.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import createError from 'http-errors'
import { User } from '../models/user.js'

/**
 * Encapsulates the account controller.
 */
export class AccountController {
  /**
   * Checks if the user is anonymous.
   *
   * If the user is logged in a 404 status code is given,
   * and if the user anonymous the next middleware is called.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  checkIfAnonymous (req, res, next) {
    if (req.session.username) {
      next(createError(404))
    } else {
      next()
    }
  }

  /**
   * Checks if the user is logged in.
   *
   * If the user is anonymous a 404 status code is given,
   * and if the user is logged in the next middleware is called.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  checkIfLoggedIn (req, res, next) {
    if (!req.session.username) {
      next(createError(404))
    } else {
      next()
    }
  }

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

  /**
   * Log in a user. Generates a new session cookie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginpost (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)

      req.session.regenerate((error) => {
        if (!error) {
          req.session.username = user.username

          req.session.flash = { type: 'success', text: 'You are now logged in.' }
          res.redirect('..')
        } else {
          next(error)
        }
      })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./login')
    }
  }

  /**
   * Log out a user. Destroys its session cookie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logout (req, res, next) {
    req.session.destroy((error) => {
      if (!error) {
        res.redirect('..')
      } else {
        next(error)
      }
    })
  }
}
