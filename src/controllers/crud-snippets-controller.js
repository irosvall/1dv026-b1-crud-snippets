/**
 * Module for the CrudSnippetsController.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import moment from 'moment'
import { Snippet } from '../models/snippet.js'

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
      const viewData = {
        snippets: (await Snippet.find({}))
          .map(snippet => ({
            id: snippet._id,
            username: snippet.username,
            message: snippet.message,
            createdAt: moment(snippet.createdAt).fromNow()
          }))
      }

      res.render('crud-snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const snippet = new Snippet({
        username: 'TestRabbit',
        message: req.body.message
      })

      await snippet.save()

      res.redirect('.')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for editing a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async edit (req, res, next) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      const viewData = {
        id: snippet._id,
        username: snippet.username,
        message: snippet.message,
        createdAt: moment(snippet.createdAt).fromNow()
      }
      res.render('crud-snippets/edit', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates the specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
      const result = await Snippet.updateOne({ _id: req.body.id }, {
        message: req.body.message
      })

      if (result.nModified === 1) {
        console.log('Snippet change success')
      } else {
        console.log('Snippet change not success')
      }

      res.redirect('..')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for removing a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async remove (req, res, next) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })

      const viewData = {
        id: snippet._id,
        username: snippet.username,
        message: snippet.message,
        createdAt: moment(snippet.createdAt).fromNow()
      }

      res.render('crud-snippets/remove', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await Snippet.deleteOne({ _id: req.body.id })

      res.redirect('..')
    } catch (error) {
      next(error)
    }
  }
}
