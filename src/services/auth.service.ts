import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { JWT_SECRET } from "../config/env.js";
import {prisma} from "../config/prisma.js"
import {
    PrismaClientKnownRequestError
} from "@prisma/client/runtime/client.js";
import { AppError } from "../errors/app.error.js";

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

export const createUser = async (
    name: string,
    email: string,
    password: string
) => {
    const passwordHash = await bcrypt.hash(password, 10);


    try{
        return await prisma.user.create({
            data: {
                name,
                email,
                passwordHash
            }
        })
    }catch(error) {
        if(error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
            throw new AppError("Email already exist", 409)
        }

        throw error
    }

    
};

export const verifyPassword = async (password: string , passwordHash: string) => {
    return bcrypt.compare(password, passwordHash)

}

export const findUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id
        }
    })

}

export const generateToken = async (userId: number) => {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: "1h"})
}