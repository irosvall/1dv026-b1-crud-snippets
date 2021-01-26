/**
 * Module for the CrudeSnippetsController.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

// "Faking" persistent textValues.
const viewData = [
  { textValue: 'bla bla bla bla' },
  { textValue: 'bla bla bla bla' },
  { textValue: 'bla test bla test' }
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
      res.render('crude-snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
