const userRoutes = require('./Routes/userRoutesRegister')
const userRouterLogin = require('./Routes/userRouterLogin')
const express = require('express')
const app = express()
const cors = require('cors')
const connectDatabase = require('./database/data')


app.use(express.json())
app.use(cors())

app.use('/register', userRoutes.register)

app.use('/login', userRouterLogin.login)

connectDatabase()

app.listen(1337, () => {
    console.log("Server started on port 1337")
})

export {};