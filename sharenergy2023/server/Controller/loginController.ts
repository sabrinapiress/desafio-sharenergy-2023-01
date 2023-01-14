import userService from '../database/userServices';
import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.statusCode = 400
            throw new Error("Please provide email and password")
        }

        if (email !== String(email) || password !== String(password)) {
            res.status(400).json({ message: "Invalid value" })
        }

        if (email.includes("@")) {
            
            const user = await userService.findOne({ email }).lean()
            if (!user) {
                return res.status(400).json({ message: "User Name or password not found" })
            }

            const isPasswordValid = new HashManager().compareHash(password, user.password)

            if (!isPasswordValid) {
                res.statusCode = 400
                throw new Error('Invalid password')
            }

            const token = new Authenticator().generateToken({
                id: user._id,
                email: user.email
            })

            res.status(200).json({
                message: 'User logged in successfully',
                token
            })

        } else {
            const user = await userService.findOne({ userName: email }).lean()
            if (!user) {
                return res.status(400).json({ message: "User Name or password not found" })
            }

            const isPasswordValid = new HashManager().compareHash(password, user.password)

            if (!isPasswordValid) {
                res.statusCode = 400
                throw new Error('Invalid password')
            }

            const token = new Authenticator().generateToken({
                id: user._id,
                email: user.email
            })

            res.status(200).json({
                message: 'User logged in successfully',
                token
            })
        }
    } catch (err: any) {
        res.status(400).json(err.message)
        if (res.statusCode === 200) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(res.statusCode).send({ message: err.message })
        }
    }
}

const loginController = module.exports = { login }
export default loginController
