export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    passwordHash: string;
}

export const users: AuthUser[] = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: "user",
        passwordHash: "$2b$10$DDaQuAiUG5rb76iQ11nQC.h/CSQy2JwmRVw6OIGQHmJAqh.kZ21ye"
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        role: "user",
        passwordHash: "SecurePass456#"
    },
    {
        id: 3,
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        role: "moderator",
        passwordHash: "ModPassword789$"
    },
    {
        id: 4,
        name: "Diana Prince",
        email: "diana.prince@example.com",
        role: "user",
        passwordHash: "WonderWoman2026!"
    },
    {
        id: 5,
        name: "Ethan Hunt",
        email: "ethan.hunt@example.com",
        role: "admin",
        passwordHash: "MissionImpossible007#"
    },
     {
        id: 6,
        name: "Roger",
        email: "roger@example.com",
        role: "admin",
        passwordHash: "$2b$10$ZWSvJ19oYJhdqlmFvLlN6uknE6vr1u01YK0l2nY0aX0uBR.dlPn86"
    }
    
];