const express = require('express')
const controller = require('../controllers/parks')

const routes = express.Router()

const baseUrl = '/parks'

routes.get(`${baseUrl}`, controller.getAll)
routes.get(`${baseUrl}/:id`, controller.getId)
routes.post(`${baseUrl}`, controller.registerPark)
routes.patch(`${baseUrl}/:id`, controller.updatePark)
routes.delete(`${baseUrl}/:id`, controller.deletePark)

module.exports = routes