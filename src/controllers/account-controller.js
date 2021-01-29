/**
 * Module for the accountController.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

/**
 * Encapsulates the account controller.
 */
export class AccountController {
  /**
   * Returns a HTML form to register a new account.
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
