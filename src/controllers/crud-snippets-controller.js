/**
 * Module for the CrudSnippetsController.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

// "Faking" persistent snippets.
const snippets = [
  {
    username: 'Ida',
    message: 'bla bla bla bla'
  },
  {
    username: 'Ida',
    message: 'bla bla bla bla'
  },
  {
    username: 'Julia',
    message: 'bla test test bla'
  }
]

/**
 * Encapsulates the crud snippets controller.
 */
export class CrudSnippetsController {
  /**
   * Displays a list of text snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = { snippets }
      res.render('crud-snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
