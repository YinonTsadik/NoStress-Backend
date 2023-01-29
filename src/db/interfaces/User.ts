export interface User {
    id: string
    firstName: string
    lastName: string
    username: string
    password: string
}

export interface CreateUser {
    firstName: string
    lastName: string
    username: string
    password: string
}

export interface UpdateUser {
    id: string
    firstName?: string
    lastName?: string
    username?: string
    password?: string
}
