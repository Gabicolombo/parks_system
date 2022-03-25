const express = require('express')
const controller = require('../controllers/location')

const routes = express.Router()

const baseUrl = '/location'

routes.get(`${baseUrl}`, controller.getAll);
routes.get(`${baseUrl}/:id`, controller.getId);
routes.post(`${baseUrl}`, controller.registerLocation);
routes.put(`${baseUrl}/:id`, controller.updateLocation);

module.exports = routes