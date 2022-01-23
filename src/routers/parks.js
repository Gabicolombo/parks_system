const express = require('express')
const controller = require('../controllers/parks')

const routes = express.Router()

const baseUrl = '/parks'

routes.get(`${baseUrl}`, controller.getAll)
routes.get(`${baseUrl}/:id`, controller.getId)


module.exports = routes