import crudController from '../Controller/crudController'

const route = require('express').Router()

const register = route.post('/', crudController.register)

const findById = route.get('/', crudController.findById)

const update = route.put('/', crudController.update)

const deleted = route.delete('/', crudController.deleted)

const getAllUsers = route.patch('/', crudController.getAllUsers)

const data  = module.exports = { register, findById, update, deleted, getAllUsers}

export default data;