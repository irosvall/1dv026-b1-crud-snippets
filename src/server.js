/**
 * The starting point of the application.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se
 * @version 1.0.0
 */

import express from 'express'
import hbs from 'express-hbs'
import session from 'express-session'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import helmet from 'helmet'
import logger from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

const MongoStore = connectMongo(session)

/**
 * The main function of the application.
 */
const main = async () => {
  try {
    await connectDB()

    const app = express()
    const directoryFullName = dirname(fileURLToPath(import.meta.url))

    const baseURL = process.env.BASE_URL || '/'

    // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
    app.use(helmet())

    // Set up a morgan logger using the dev format for log entries.
    app.use(logger('dev'))

    // View engine setup.
    app.engine('hbs', hbs.express4({
      defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
      partialsDir: join(directoryFullName, 'views', 'partials')
    }))
    app.set('view engine', 'hbs')
    app.set('views', join(directoryFullName, 'views'))

    // Parse requests of the content type application/x-www-form-urlencoded.
    // Populates the request object with a body object (req.body).
    app.use(express.urlencoded({ extended: false }))

    // Serve static files.
    app.use(express.static(join(directoryFullName, '..', 'public')))

    // Setup the session storage.
    const sessionStore = new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions'
    })

    // Setup and use session middleware.
    const sessionOptions = {
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: false, // Resave even if a request is not changing the session.
      saveUninitialized: false, // Don't save a created but not modified session.
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: 'lax'
      }
    }

    if (app.get('env') === 'production') {
      console.log('Running in production')
      app.set('trust proxy', 1)
      sessionOptions.cookie.secure = true
    }

    app.use(session(sessionOptions))

    // middleware to be executed before the routes.
    app.use((req, res, next) => {
      // flash messages - survives only a round trip
      if (req.session.flash) {
        res.locals.flash = req.session.flash
        delete req.session.flash
      }
      if (req.session.username) {
        res.locals.username = req.session.username
      }

      // Pass the base URL to the views.
      res.locals.baseURL = baseURL

      next()
    })

    // Register routes.
    app.use('/', router)

    // Error handler.
    app.use(function (err, req, res, next) {
      // 404 Not Found.
      if (err.status === 404) {
        return res
          .status(404)
          .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
      } else if (err.status === 403) {
        return res
          .status(403)
          .sendFile(join(directoryFullName, 'views', 'errors', '403.html'))
      }

      // 500 Internal Server Error (in production, all other errors send this response).
      if (req.app.get('env') !== 'development') {
        return res
          .status(500)
          .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
      }

      // Development only!
      // Only providing detailed error in development.

      // Render the error page.
      res
        .status(err.status || 500)
        .render('errors/error', { error: err })
    })

    // Starts the HTTP server listening for connections.
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`)
      console.log('Press Ctrl-C to terminate...')
    })
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}

main()
