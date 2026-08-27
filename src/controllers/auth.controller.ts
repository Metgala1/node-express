import { AppError } from "../errors/app.error.js";
import { createUser, findUserByEmail , generateToken, verifyPassword } from "../services/auth.service.js";
import type { Request , Response } from "express";
import { getUserById } from "../services/user.service.js";
import { email } from "zod";

export const registerController = async (req: Request , res: Response) => {
    const {name, email, password} = req.body

    const existingUser = await findUserByEmail(email)

    if(existingUser) {
        throw new AppError("Email already exist", 409)
    }
    const user = await createUser(name , email , password)
    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email
    })

}

export const loginController = async (req: Request , res: Response) => {
    const {email , password} = req.body
    const user =  await findUserByEmail(email)
    
    if(!user) {
        throw new AppError("Invalid email or password", 401)
    }
    const validPassword = await verifyPassword(password, user.passwordHash)
    if(!validPassword) {
        throw new AppError("Invalid email or password", 401)
    }
    const token = await generateToken(user.id)
    console.log(token)

    res.json({
        user,
        token: token
    })


}

export const meController = async (
    req: Request,
    res: Response
) => {
    const id = Number(req.user?.userId)
    const user = await getUserById(id)

    if(!user){
        throw new AppError("User not found", 404)
    }

    res.json({
        userId: req.user?.userId,
        userName: user?.name,
        email: user?.email
    });
};