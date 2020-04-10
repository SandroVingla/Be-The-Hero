const express = require('express')
const ongController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const { celebrate, Segments, Joi } = require('celebrate')
const routes = express.Router()

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })

}), SessionController.create)

routes.get('/ongs', ongController.index)
routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp:Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    
    }).unknown(),
}), ProfileController.index)

routes.post('/incidents',celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),

        [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
        })
    })
    
}), IncidentsController.create)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        pages: Joi.number()
    })
}), IncidentsController.index)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentsController.delete)

module.exports = routes;