/**
 * Module for the CrudeSnippetsController.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

// "Faking" persistent textValues.
const snippets = [
  {
    username: 'Ida',
    textValue: 'bla bla bla bla'
  },
  {
    username: 'Ida',
    textValue: 'bla bla bla bla'
  },
  {
    username: 'Julia',
    textValue: 'bla test test bla'
  }
]

/**
 * Encapsulates the crude snippets controller.
 */
export class CrudeSnippetsController {
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
      res.render('crude-snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
