/**
 * Module for the CrudSnippetsController.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import moment from 'moment'
import createError from 'http-errors'
import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates the crud snippets controller.
 */
export class CrudSnippetsController {
  /**
   * Authorizes the user.
   *
   * If the user is not logged in a 404 is sent, and if the user is logged in,
   * but not the owner then a 403 is sent.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Function} Express next middleware function.
   */
  async authorize (req, res, next) {
    if (!req.session.username) {
      return next(createError(404))
    } else if (req.params.id) {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      if (snippet.username !== req.session.username) {
        return next(createError(403))
      }
    }
    next()
  }

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
   */
  async create (req, res) {
    try {
      const snippet = new Snippet({
        username: req.session.username,
        message: req.body.message
      })

      await snippet.save()

      req.session.flash = { type: 'success', text: 'The post was created successfully.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('.')
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
   */
  async update (req, res) {
    try {
      await Snippet.updateOne({ _id: req.body.id }, {
        message: req.body.message
      })

      req.session.flash = { type: 'success', text: 'The post was changed successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./edit')
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

      req.session.flash = { type: 'success', text: 'The post was deleted successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./remove')
    }
  }
}
