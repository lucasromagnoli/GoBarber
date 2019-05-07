const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.use('/app', authMiddleware)

routes.get('/', guestMiddleware, SessionController.create)
routes.get('/signup', guestMiddleware, UserController.create)
routes.get('/app/dashboard', (req, res) => {
  console.log('req.session.user :', req.session.user)
  res.render('dashboard')
})

routes.post('/signin', SessionController.store)
routes.post('/signup', upload.single('avatar'), UserController.store)

module.exports = routes
