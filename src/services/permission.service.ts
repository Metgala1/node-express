import {prisma} from "../config/prisma.js"

export const getPermissions = () => {
    return prisma.permission.findMany()
}