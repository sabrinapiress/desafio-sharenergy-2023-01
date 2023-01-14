import userController from '../Controller/registerController';

const route = require('express').Router()

const register = route.post('/', userController.register)

const data = module.exports = { register}

export default data;