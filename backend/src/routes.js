const express = require('express')

const ongController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)
routes.get('/profile', ProfileController.index)

routes.post('/incidents', IncidentsController.create)
routes.get('/incidents', IncidentsController.index)
routes.delete('/incidents/:id', IncidentsController.delete)

module.exports = routes;