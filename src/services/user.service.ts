import { AuthUser } from "../config/user.js";
import { users } from "../config/user.js";
import {prisma} from "../config/prisma.js"
import { date } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { AppError } from "../errors/app.error.js";

export const getUsers = async () => {
    return prisma.user.findMany();
}

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            roles: {
                include: {
                    role: true
                }
            }
        }
    });
};


// export const createUser = async (name: string, email: string, password: string): Promise<AuthUser> => {
//     const newUser = {
//         id: users.length + 1,
//         name: name,
//         email: email,
//         role: "user",
//         passwordHash: password
//     }
//     users.push(newUser)
//     return newUser
// }

export const updateUser = async (id: number , name: string)  => {
    try {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            name
        }
    })
    }catch(error) {
        if(error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new AppError("User not found", 404)
        }

        throw error
    }

}

export const deleteUser = async (id: number) => {
    try{
        return await prisma.user.delete({
            where: {
                id
            }
        })
    }catch(error) {
        if(error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new AppError("User not found", 404)
        }
        throw error
    }
   
}