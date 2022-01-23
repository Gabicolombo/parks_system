const express = require('express')
const controller = require('../controllers/employee')

const router= express.Router()

const baseUrl = '/employees'

router.get(`${baseUrl}`, controller.allEmployees)
router.post(`${baseUrl}`, controller.register)
router.put(`${baseUrl}/:id`, controller.update)
router.delete(`${baseUrl}/:id`, controller.deleteEmployee)

module.exports = router




