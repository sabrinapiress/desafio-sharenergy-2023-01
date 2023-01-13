const userService = require('../services/userServices')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {

        const { userName, firstName, lastName, email, password } = req.body

        if (!userName || !firstName || !lastName || !email || !password) {
            res.status(400).json({ message: "Submit all fields for registration" })
        }

        if (userName !== String(userName) || firstName !== String(firstName) || lastName !== String(lastName) || email !== String(email) || password !== String(password)) {
            res.status(400).json({ message: "Invalid value" })
        }

        if (email) {
            const checkEmail = await userService.findOne({ email: email })

            if (checkEmail) {
                return res.status(400).json({ message: "Duplicate email" })
            }
        }

        const salt = bcrypt.genSaltSync(10)

        const hashedPassword = bcrypt.hashSync(password, salt)

        const token = jwt.sign({
            name: userName,
            email: email
        }, 'secret123')

        const body = {
            userName, firstName, lastName, email, password: hashedPassword, token
        }
        
        const user = await userService.create(body)

        if (!user) {
            return res.status(400).json({ message: 'Error creating User' })
        }

        res.status(200).json({
            message: 'User created successfully',
            token: token
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = { register }
