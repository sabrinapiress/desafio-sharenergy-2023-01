import { Request, Response } from "express"

const userControllerLogin = require('../Controller/loginController')
const route = require('express').Router()

const login = route.post('/',  userControllerLogin.login )

module.exports = {login}