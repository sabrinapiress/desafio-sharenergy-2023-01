const userControllerLogin = require('../Controller/loginController')
const route = require('express').Router()

const login = route.post('/',  userControllerLogin.login )

module.exports = {login}

export {};