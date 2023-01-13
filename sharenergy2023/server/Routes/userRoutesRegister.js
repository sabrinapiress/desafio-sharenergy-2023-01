const userController = require('../Controller/registerController')
const route = require('express').Router()

const register = route.post('/', userController.register)

module.exports = { register}