import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import userService from '../database/userServices';

const register = async (req: Request, res: Response) => {
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
                res.statusCode = 400
                throw new Error('Email already exists')
            }
        }
        
        if (userName){
            const checkUserName = await userService.findOne({ userName: userName })
            if (checkUserName) {
                res.statusCode = 400
                throw new Error('UserName already exists')
            }
        }

        if (password.length < 6) {
            res.statusCode = 400
            throw new Error("Password must have at least 6 characters")
        }

        const cypherPassword = new HashManager().createHash(password)
    
        const body = {
            userName, firstName, lastName, email, password: cypherPassword
        }
        
        const user = await userService.create(body)

        if (!user) {
            return res.status(400).json({ message: 'Error creating User' })
        }

        const token = new Authenticator().generateToken({
            id: user._id,
            email: user.email
        })


        res.status(200).json({
            message: 'User created successfully',
            token: token
        })
        
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const userController = module.exports = { register }
export default userController