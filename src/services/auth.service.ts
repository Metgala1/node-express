import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { JWT_SECRET } from "../config/env.js";
import { AuthUser } from "../config/user.js";
import { users } from "../config/user.js";

export const findUserByEmail = (email: string) => {
    return users.find(user => user.email === email)
}

export const createUser = async (name: string , email: string , password: string) => {
    const passwordHash = await bcrypt.hash(password, 10)

    const user: AuthUser = {
        id: users.length + 1,
        name: name,
        email: email,
        role: "admin",
        passwordHash: passwordHash
    }

    users.push(user)
    return user;
}

export const verifyPassword = async (password: string , passwordHash: string) => {
    return bcrypt.compare(password, passwordHash)

}

export const findUserById = async (id: number) => {
    const user = users.find((user) => user.id === id)
    if(!user) {
        return null
    }
    return user

}

export const generateToken = async (userId: number) => {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: "1h"})
}