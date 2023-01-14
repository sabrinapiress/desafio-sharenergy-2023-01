import Crud from '../Model/crudModel'

const findOne = (body:object) => Crud.findOne(body)

const create = async (body :object) => await Crud.create(body)

const update = async (id : string, body :object) => await Crud.findByIdAndUpdate(id, body)

const deleted = async (body:object) => await Crud.findByIdAndDelete(body)

const findById = async (body:object) => await Crud.findById(body)

const getAllUsers = async () => await Crud.find()

const data = module.exports = {create, update, deleted, findOne, findById, getAllUsers}

export default data