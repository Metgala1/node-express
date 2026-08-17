import { AuthUser } from "../config/user.js";
import { users } from "../config/user.js";

export const getUsers = async ():Promise<AuthUser[]> => {
    return users;
}

export const getUserById = async (id: number): Promise<AuthUser | undefined> => {
    return users.find(user => user.id === id);
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

export const updateUser = async (id: number , name: string): Promise<AuthUser | null> => {
    const user = users.find((user) => user.id === id)
    if(!user) {
        return null
    }

    user.name = name
    return user;

}

export const deleteUser = async (id: number): Promise<boolean> => {
    const index = users.findIndex(user => user.id === id)
    if(index === -1) {
        return false
    }
    users.splice(index , 1)
    return true
}