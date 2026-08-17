export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    passwordHash: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    
    
}

export interface UpdateUserRequest {
    name: string
}

export interface UserParams {
    id: string
}
