import type { Request, Response } from "express";

import { 
    getUsers ,
    getUserById,
    // createUser,
    updateUser,
    deleteUser
    } from "../services/user.service.js";
import { AppError } from "../errors/app.error.js";



export const getUsersController = async (req: Request, res: Response) => {
    const users = await getUsers()
    res.json(users)
}

export const getUserByIdController = async (req: Request ,res: Response)=> {
    const id = Number(req.params.id)
    const user = await getUserById(id)
    if(!user) {
        throw new AppError("User not found",
            404
        )
    }
    res.json(user)
};

// export const createUserController = async (req: Request, res: Response) => {
//     const {name, email, password} = req.body
//     const user = await createUser(name, email, password)
//     res.status(201).json(user)
// }

export const updateUserController = async (req: Request, res: Response) => {
        const {name} = req.body
        const id = Number(req.params.id)
        const updatedUser = await updateUser(id, name)

        if(!updatedUser) {
            throw new AppError("User not found",
                404
            )
        }
        res.json(updatedUser);

}

export const deleteUserController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await deleteUser(id)

    if (!deleted) {
        throw new AppError("Could not find user to delete",
            404
        )
    }

    res.json({
        message: "User deleted successfully"
    });
};